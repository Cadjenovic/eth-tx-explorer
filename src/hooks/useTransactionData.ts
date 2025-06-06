import { useEffect, useState } from "react";
import { delay } from "../utils/utils";
import type { TransactionData } from "../types/TransactionData";

const ETHERSCAN_BASE_URL = "https://api.etherscan.io/api";
const API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY;

const txCache = new Map<string, TransactionData>();

export function useTransactionData(hash: string | null) {
    const [data, setData] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!hash) return;

        if (txCache.has(hash)) {
            setData(txCache.get(hash)!);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                await delay(2000);

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
                    hash: txJson.result.hash,
                    from: txJson.result.from,
                    to: txJson.result.to,
                    value: parseInt(txJson.result.value, 16) / 1e18 + " ETH",
                    input: txJson.input,
                    gas: parseInt(txJson.result.gas, 16).toString(),
                    gasPrice:
                        parseInt(txJson.result.gasPrice, 16) / 1e9 + " Gwei",
                    blockNumber: parseInt(
                        txJson.result.blockNumber,
                        16
                    ).toString(),
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
