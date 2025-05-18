import Explore from "./sections/Explore";
import Trace from "./sections/Trace";
import Gas from "./sections/Gas";
import Navbar from "./components/Navbar/Navbar";
import { useRef, useState } from "react";
import "./index.css";

function App() {
    const [hash, setHash] = useState<string>("");

    const exploreRef = useRef<HTMLDivElement>(null);
    const traceRef = useRef<HTMLDivElement>(null);
    const gasRef = useRef<HTMLDivElement>(null);

    return (
        <div className='container'>
            <Navbar />
            <div ref={exploreRef} id='explore'>
                <Explore hash={hash} setHash={setHash} />
            </div>

            <div ref={traceRef} id='trace'>
                <Trace hash={hash} />
            </div>

            <div ref={gasRef} id='gas'>
                <Gas hash={hash} />
            </div>
        </div>
    );
}

export default App;
