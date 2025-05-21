import { useEffect, useState } from "react";
import traceMock from "../mock/trace";
import { delay } from "../utils/utils";
import type { TraceStep } from "../types/TraceStep";

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
                await delay(5000);

                setTrace(traceMock);
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
