import "./styles/main.css";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import { useState } from "react";
import { useTransactionData } from "./hooks/useTransactionData";
import TraceViewer from "./components/TraceViewer/TraceViewer";
import traceMock from "./mock/trace";

function App() {
    const [selectedHash, setSelectedHash] = useState<string | null>(null);
    const { data, loading, error } = useTransactionData(selectedHash);

    const onTransactionSubmit = (hash: string) => {
        setSelectedHash(hash);
    };

    return (
        <div className='container'>
            <h1>Ethereum Transaction Explorer</h1>
            <TransactionForm onSubmit={onTransactionSubmit} />

            {loading && <p>Loading transaction...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && (
                <div className='card'>
                    <p>
                        <strong>Hash:</strong> {data.hash}
                    </p>
                    <p>
                        <strong>From:</strong> {data.from}
                    </p>
                    <p>
                        <strong>To:</strong> {data.to}
                    </p>
                    <p>
                        <strong>Value:</strong> {data.value}
                    </p>
                    <p>
                        <strong>Gas:</strong> {data.gas}
                    </p>
                    <p>
                        <strong>Gas Price:</strong> {data.gasPrice}
                    </p>
                    <p>
                        <strong>Block Number:</strong> {data.blockNumber}
                    </p>
                </div>
            )}

            <TraceViewer trace={traceMock} />
        </div>
    );
}

export default App;
