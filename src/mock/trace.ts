import type { TraceStep } from "../components/TraceViewer/TraceViewer";

export default [
    {
        type: "CALL",
        contract: "ContractA",
        functionName: "start",
        depth: 0,
        gasUsed: 30000
    },
    {
        type: "CALL",
        contract: "ContractB",
        functionName: "doWork",
        depth: 1,
        gasUsed: 15000
    },
    { type: "SSTORE", contract: "ContractB", depth: 1, gasUsed: 1200 },
    {
        type: "RETURN",
        contract: "ContractB",
        depth: 1,
        gasUsed: 0,
        result: "success"
    },
    { type: "LOG", contract: "ContractA", depth: 0, gasUsed: 900 },
    {
        type: "RETURN",
        contract: "ContractA",
        depth: 0,
        gasUsed: 0,
        result: "success"
    }
] as TraceStep[];
