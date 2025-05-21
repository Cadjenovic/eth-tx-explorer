import { useState } from "react";
import "./TraceViewer.css";
import { useScrollToActiveTrace } from "../../hooks/useScrollToActiveTrace";
import type { TraceStep } from "../../types/TraceStep";

interface TraceViewerProps {
    trace: TraceStep[];
}

const TraceViewer = ({ trace }: TraceViewerProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const itemRefs = useScrollToActiveTrace<HTMLLIElement>(selectedIndex);

    const handleClick = (index: number) => {
        setSelectedIndex((prev) => (prev === index ? null : index));
    };

    return (
        <div className='trace-viewer'>
            <h2>Execution Trace</h2>
            <ul className='trace-list'>
                {trace.map((step, index) => (
                    <div key={index}>
                        <li
                            ref={(el: HTMLLIElement | null) => {
                                itemRefs.current[index] = el;
                            }}
                            className={`trace-step trace-type-${step.call_type?.toLowerCase()}`}
                            style={{ marginLeft: `${step.depth * 20}px` }}
                            onClick={() => handleClick(index)}
                        >
                            <strong>{step.call_type}</strong> →{" "}
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
                        {selectedIndex === index && (
                            <li
                                className={`trace-details`}
                                style={{
                                    marginLeft: `${step.depth * 20 + 20}px`
                                }}
                            >
                                <p>
                                    <strong>Contract:</strong> {step.contract}
                                </p>
                                <p>
                                    <strong>Function:</strong>{" "}
                                    {step.functionName || "—"}
                                </p>
                                <p>
                                    <strong>Type:</strong> {step.call_type}
                                </p>
                                <p>
                                    <strong>Gas Used:</strong> {step.gasUsed}
                                </p>
                                <p>
                                    <strong>Result:</strong>{" "}
                                    {step.result || "—"}
                                </p>
                                <p>
                                    <strong>Depth:</strong> {step.depth}
                                </p>
                            </li>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default TraceViewer;
