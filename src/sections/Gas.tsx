import { useTransactionData } from "../hooks/useTransactionData";

interface GasProps {
    hash: string | null;
}

const GasSection = ({ hash }: GasProps) => {
    const { data, loading, error } = useTransactionData(hash);

    const gas = parseInt(data?.gas ?? "", 10);
    const gasPriceGwei = parseFloat(data?.gasPrice ?? "");
    const gasEth = (gas * gasPriceGwei) / 1e9;

    return (
        <section className='section-container'>
            {loading && <p>Loading transaction...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {data && (
                <div>
                    <h2>Gas & Fee Information</h2>
                    <div className='card'>
                        <p>
                            <strong>Gas Limit:</strong> {data.gas}
                        </p>
                        <p>
                            <strong>Gas Used:</strong> {data.gasUsed}
                        </p>
                        <p>
                            <strong>Gas Price:</strong> {data.gasPrice}
                        </p>
                        <p>
                            <strong>Estimated Cost:</strong> {gasEth.toFixed(6)}{" "}
                            ETH
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GasSection;
