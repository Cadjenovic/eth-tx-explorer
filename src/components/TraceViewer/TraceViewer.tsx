import "./TraceViewer.css";

export interface TraceStep {
    type:
        | "CALL"
        | "DELEGATECALL"
        | "SSTORE"
        | "SLOAD"
        | "LOG"
        | "RETURN"
        | "REVERT";
    contract: string;
    functionName?: string;
    depth: number;
    gasUsed: number;
    result?: string;
}

interface TraceViewerProps {
    trace: TraceStep[];
}

const TraceViewer = ({ trace }: TraceViewerProps) => {
    return (
        <div className='trace-viewer'>
            <h2>Execution Trace</h2>
            <ul className='trace-list'>
                {trace.map((step, index) => (
                    <li
                        key={index}
                        className={`trace-step trace-type-${step.type.toLowerCase()}`}
                        style={{ marginLeft: `${step.depth * 20}px` }}
                    >
                        <strong>{step.type}</strong> →{" "}
                        <code>{step.contract}</code>
                        {step.functionName && `.${step.functionName}()`}
                        <span className='trace-gas'>
                            {" "}
                            | Gas: {step.gasUsed}
                        </span>
                        {step.result && (
                            <span className='trace-result'>
                                {" "}
                                → {step.result}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TraceViewer;
