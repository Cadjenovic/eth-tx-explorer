import { useEffect, useState } from "react";

interface TransactionData {
    hash: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    blockNumber: string;
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
                const url = `${ETHERSCAN_BASE_URL}?module=proxy&action=eth_getTransactionByHash&txhash=${hash}&apikey=${API_KEY}`;
                const res = await fetch(url);
                const json = await res.json();

                if (!json.result) {
                    throw new Error("Transaction not found");
                }

                const tx = json.result;

                const parsed: TransactionData = {
                    hash: tx.hash,
                    from: tx.from,
                    to: tx.to,
                    value: parseInt(tx.value, 16) / 1e18 + " ETH",
                    gas: parseInt(tx.gas, 16).toString(),
                    gasPrice: parseInt(tx.gasPrice, 16) / 1e9 + " Gwei",
                    blockNumber: parseInt(tx.blockNumber, 16).toString()
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
