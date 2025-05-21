import { useMemo } from "react";
import GasBreakdownPie from "../components/GasBreakdownPie/GasBreakdownPie";
import GasTimelineHistogram from "../components/GasTimelineHistogram/GasTimelineHistogram";
import GasUsageBar from "../components/GasUsageBar/GasUsageBar";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import type { TraceStep } from "../types/TraceStep";
import type { TransactionData } from "../types/TransactionData";

interface GasProps {
    txData: TransactionData | null;
    traceData: {
        trace: TraceStep[] | null;
        loading: boolean;
        error: string | null;
    };
}

function extractGasBreakdown(trace: TraceStep[] | null) {
    const contractUsage: Record<string, number> = {};
    const typeUsage: Record<string, number> = {};

    trace?.forEach((step) => {
        contractUsage[step.contract]
            ? (contractUsage[step.contract] += step.gasUsed)
            : (contractUsage[step.contract] = step.gasUsed);
        typeUsage[step.call_type]
            ? (typeUsage[step.call_type] += step.gasUsed)
            : (typeUsage[step.call_type] = step.gasUsed);
    });

    const stepUsageList =
        trace?.map((step, index) => ({
            name: `${step.call_type} --- Step #${index}`,
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

const GasSection = ({ txData, traceData }: GasProps) => {
    const { stepUsageList, contractUsageList, typeUsageList } = useMemo(() => {
        return extractGasBreakdown(traceData.trace);
    }, [traceData]);

    const gas = parseInt(txData?.gas ?? "", 10);
    const gasPriceGwei = parseFloat(txData?.gasPrice ?? "");
    const gasEth = (gas * gasPriceGwei) / 1e9;

    return (
        <>
            <div>
                {!txData && <LoadingSpinner text='Transaction' />}
                {txData && (
                    <>
                        <h2>Gas & Fee Information</h2>
                        <div className='card'>
                            <p>
                                <strong>Gas Limit:</strong> {txData.gas}
                            </p>
                            <p>
                                <strong>Gas Used:</strong> {txData.gasUsed}
                            </p>
                            <p>
                                <strong>Gas Price:</strong> {txData.gasPrice}
                            </p>
                            <p>
                                <strong>Estimated Cost:</strong>{" "}
                                {gasEth.toFixed(6)} ETH
                            </p>
                        </div>
                        <div className='charts-container'>
                            <div className='chart-container'>
                                <GasUsageBar
                                    gasUsed={parseInt(txData.gasUsed ?? "", 10)}
                                    gasLimit={gas}
                                />
                            </div>
                            <div className='chart-container'>
                                {traceData.loading && (
                                    <LoadingSpinner text='Trace' />
                                )}
                                {traceData.error && (
                                    <p style={{ color: "red" }}>
                                        {traceData.error}
                                    </p>
                                )}
                                {traceData.trace && (
                                    <GasBreakdownPie
                                        title='Gas Breakdown by Contract'
                                        gasUsage={contractUsageList}
                                    />
                                )}
                            </div>
                            <div className='chart-container'>
                                {traceData.loading && (
                                    <LoadingSpinner text='Trace' />
                                )}
                                {traceData.error && (
                                    <p style={{ color: "red" }}>
                                        {traceData.error}
                                    </p>
                                )}
                                {traceData.trace && (
                                    <GasBreakdownPie
                                        title='Gas Breakdown by Type'
                                        gasUsage={typeUsageList}
                                    />
                                )}
                            </div>
                            <div className='chart-container'>
                                {traceData.loading && (
                                    <LoadingSpinner text='Trace' />
                                )}
                                {traceData.error && (
                                    <p style={{ color: "red" }}>
                                        {traceData.error}
                                    </p>
                                )}
                                {traceData.trace && (
                                    <GasTimelineHistogram
                                        stepUsage={stepUsageList}
                                    />
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default GasSection;
