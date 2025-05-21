import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import type { TransactionData } from "../types/TransactionData";

interface ExploreProps {
    txData: {
        data: TransactionData | null;
        loading: boolean;
        error: string | null;
    };
    setHash: (hash: string) => void;
}

const Explore = ({ txData, setHash }: ExploreProps) => {
    return (
        <>
            <h2>Explore Transaction</h2>
            <TransactionForm onSubmit={setHash} />

            {txData.loading && <LoadingSpinner text='Transaction' />}
            {txData.error && <p style={{ color: "red" }}>{txData.error}</p>}
            {txData.data && (
                <div className='card'>
                    <p>
                        <strong>Hash:</strong> {txData.data.hash}
                    </p>
                    <p>
                        <strong>From:</strong> {txData.data.from}
                    </p>
                    <p>
                        <strong>To:</strong> {txData.data.to}
                    </p>
                    <p>
                        <strong>Value:</strong> {txData.data.value}
                    </p>
                    <p>
                        <strong>Gas:</strong> {txData.data.gas}
                    </p>
                    <p>
                        <strong>Gas Price:</strong> {txData.data.gasPrice}
                    </p>
                    <p>
                        <strong>Block Number:</strong> {txData.data.blockNumber}
                    </p>
                </div>
            )}
        </>
    );
};

export default Explore;
