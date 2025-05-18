import { useState } from "react";
import TraceViewer from "../components/TraceViewer/TraceViewer";
import { useMockTraceData } from "../hooks/useMockTraceData";
import TransactionForm from "../components/TransactionForm/TransactionForm";

interface TraceProps {
    hash: string;
}

const Trace = ({ hash }: TraceProps) => {
    const {
        trace,
        loading: traceLoading,
        error: traceError
    } = useMockTraceData(hash);

    return (
        <section className='section-container'>
            {traceLoading && <p>Loading trace...</p>}
            {traceError && <p style={{ color: "red" }}>{traceError}</p>}
            {trace && <TraceViewer trace={trace} />}
        </section>
    );
};

export default Trace;
