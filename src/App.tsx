import Explore from "./sections/Explore";
import Navbar from "./components/Navbar/Navbar";
import { lazy, Suspense, useRef, useState } from "react";
import "./index.css";
import { useTransactionData } from "./hooks/useTransactionData";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { useMockTraceData } from "./hooks/useMockTraceData";

const Trace = lazy(() => import("./sections/Trace"));
const Gas = lazy(() => import("./sections/Gas"));

function App() {
    const [hash, setHash] = useState<string>("");
    const { data, loading, error } = useTransactionData(hash);
    const {
        trace,
        loading: loadingTrace,
        error: errorTrace
    } = useMockTraceData(hash);
    const exploreRef = useRef<HTMLDivElement>(null);
    const traceRef = useRef<HTMLDivElement>(null);
    const gasRef = useRef<HTMLDivElement>(null);

    return (
        <div className='container'>
            <Navbar />
            <section
                ref={exploreRef}
                id='explore'
                className='section-container'
            >
                <Explore txData={{ data, loading, error }} setHash={setHash} />
            </section>

            {hash && (
                <section
                    ref={traceRef}
                    id='trace'
                    className='section-container'
                >
                    <Suspense fallback={<LoadingSpinner text='Trace' />}>
                        <Trace
                            traceData={{
                                trace,
                                loading: loadingTrace,
                                error: errorTrace
                            }}
                        />
                    </Suspense>
                </section>
            )}

            {hash && (
                <section ref={gasRef} id='gas' className='section-container'>
                    <Suspense fallback={<LoadingSpinner text='Gas Info' />}>
                        <Gas
                            txData={data}
                            traceData={{
                                trace,
                                loading: loadingTrace,
                                error: errorTrace
                            }}
                        />
                    </Suspense>
                </section>
            )}
        </div>
    );
}

export default App;
