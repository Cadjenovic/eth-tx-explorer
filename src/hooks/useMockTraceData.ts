import { useEffect, useState } from "react";
import type { TraceStep } from "../components/TraceViewer/TraceViewer";
import traceMock from "../mock/trace";

export function useMockTraceData(hash: string | null) {
    const [trace, setTrace] = useState<TraceStep[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!hash) return;

        const loadTrace = async () => {
            setLoading(true);
            setError(null);
            setTrace(null);

            try {
                const mockTrace: TraceStep[] = traceMock;

                setTrace(mockTrace);
            } catch (err) {
                setError("Trace failed to load.");
            } finally {
                setLoading(false);
            }
        };

        loadTrace();
    }, [hash]);

    return { trace, loading, error };
}
