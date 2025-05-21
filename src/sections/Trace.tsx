import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TraceViewer from "../components/TraceViewer/TraceViewer";
import type { TraceStep } from "../types/TraceStep";

interface TraceProps {
    traceData: {
        trace: TraceStep[] | null;
        loading: boolean;
        error: string | null;
    };
}

const Trace = ({ traceData }: TraceProps) => {
    return (
        <>
            {traceData.loading && <LoadingSpinner text='Trace' />}
            {traceData.error && (
                <p style={{ color: "red" }}>{traceData.error}</p>
            )}
            {traceData.trace && <TraceViewer trace={traceData.trace} />}
        </>
    );
};

export default Trace;
