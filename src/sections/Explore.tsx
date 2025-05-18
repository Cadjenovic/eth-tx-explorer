import TransactionForm from "../components/TransactionForm/TransactionForm";
import { useTransactionData } from "../hooks/useTransactionData";

interface ExploreProps {
    hash: string;
    setHash: (hash: string) => void;
}

const Explore = ({ hash, setHash }: ExploreProps) => {
    const { data, loading, error } = useTransactionData(hash);

    return (
        <section className='section-container'>
            <h2>Explore Transaction</h2>
            <TransactionForm onSubmit={setHash} />

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
        </section>
    );
};

export default Explore;
