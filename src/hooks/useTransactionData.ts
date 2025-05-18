import { useEffect, useState } from "react";

interface TransactionData {
    hash: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    blockNumber: string;
    gasUsed?: string;
}

const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";
const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

export function useTransactionData(hash: string | null) {
    const [data, setData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!hash) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const txUrl = `${ETHERSCAN_BASE_URL}?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${API_KEY}`;
                const receiptUrl = `${ETHERSCAN_BASE_URL}?module=proxy&action=eth_getTransactionReceipt&txhash=${hash}&apikey=${API_KEY}`;

                const [txRes, receiptRes] = await Promise.all([
                    fetch(txUrl),
                    fetch(receiptUrl)
                ]);

                const [txJson, receiptJson] = await Promise.all([
                    txRes.json(),
                    receiptRes.json()
                ]);

                if (!txJson.result) {
                    throw new Error("Transaction not found");
                }

                if (!receiptJson.result) {
                    throw new Error("Receipt not found");
                }

                const parsed: TransactionData = {
                    hash: txJson.hash,
                    from: txJson.from,
                    to: txJson.to,
                    value: parseInt(txJson.value, 16) / 1e18 + " ETH",
                    gas: parseInt(txJson.gas, 16).toString(),
                    gasPrice: parseInt(txJson.gasPrice, 16) / 1e9 + " Gwei",
                    blockNumber: parseInt(txJson.blockNumber, 16).toString(),
                    gasUsed: parseInt(receiptJson.result.gasUsed, 16).toString()
                };

                setData(parsed);
            } catch (err) {
                setError("Failed to fetch transaction.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hash]);

    return { data, loading, error };
}
