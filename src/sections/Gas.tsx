import GasBreakdownPie from "../components/GasBreakdownPie/GasBreakdownPie";
import GasTimelineHistogram from "../components/GasTimelineHistogram/GasTimelineHistogram";
import GasUsageBar from "../components/GasUsageBar/GasUsageBar";
import type { TraceStep } from "../components/TraceViewer/TraceViewer";
import { useMockTraceData } from "../hooks/useMockTraceData";
import { useTransactionData } from "../hooks/useTransactionData";

interface GasProps {
    hash: string | null;
}

function extractGasBreakdown(trace: TraceStep[] | null) {
    const contractUsage: Record<string, number> = {};
    const typeUsage: Record<string, number> = {};

    trace?.forEach((step) => {
        contractUsage[step.contract]
            ? (contractUsage[step.contract] += step.gasUsed)
            : (contractUsage[step.contract] = step.gasUsed);
        typeUsage[step.type]
            ? (typeUsage[step.type] += step.gasUsed)
            : (typeUsage[step.type] = step.gasUsed);
    });

    const stepUsageList =
        trace?.map((step, index) => ({
            name: `${step.type} --- Step #${index}`,
            usage: step.gasUsed
        })) ?? [];

    const contractUsageList = Object.entries(contractUsage).map(
        ([name, usage]) => ({
            name,
            usage
        })
    );

    const typeUsageList = Object.entries(typeUsage).map(([name, usage]) => ({
        name,
        usage
    }));

    return { stepUsageList, contractUsageList, typeUsageList };
}

const GasSection = ({ hash }: GasProps) => {
    const { data, loading, error } = useTransactionData(hash);
    const {
        trace,
        loading: loadingTrace,
        error: errorTrace
    } = useMockTraceData(hash);

    const { stepUsageList, contractUsageList, typeUsageList } =
        extractGasBreakdown(trace);

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
                    <div className='charts-container'>
                        <div className='chart-container'>
                            <GasUsageBar
                                // gasUsed={parseInt(data.gasUsed ?? "", 10)}
                                gasUsed={parseInt(data.gasUsed ?? "", 10)}
                                gasLimit={gas}
                            />
                        </div>
                        <div className='chart-container'>
                            {loadingTrace && <p>Loading trace...</p>}
                            {errorTrace && (
                                <p style={{ color: "red" }}>{errorTrace}</p>
                            )}
                            {trace && (
                                <GasBreakdownPie
                                    title='Gas Breakdown by Contract'
                                    gasUsage={contractUsageList}
                                />
                            )}
                        </div>
                        <div className='chart-container'>
                            {loadingTrace && <p>Loading trace...</p>}
                            {errorTrace && (
                                <p style={{ color: "red" }}>{errorTrace}</p>
                            )}
                            {trace && (
                                <GasBreakdownPie
                                    title='Gas Breakdown by Type'
                                    gasUsage={typeUsageList}
                                />
                            )}
                        </div>
                        <div className='chart-container'>
                            <GasTimelineHistogram stepUsage={stepUsageList} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default GasSection;
