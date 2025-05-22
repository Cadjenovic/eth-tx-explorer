import type { TraceStep } from "../types/TraceStep";

export default [
    {
        call_type: "CALL",
        contract: "ContractA",
        functionName: "start",
        depth: 0,
        gasUsed: 30000
    },
    {
        call_type: "CALL",
        contract: "ContractB",
        functionName: "doWork",
        depth: 1,
        gasUsed: 15000
    },
    { call_type: "SSTORE", contract: "ContractB", depth: 1, gasUsed: 1200 },
    {
        call_type: "RETURN",
        contract: "ContractB",
        depth: 1,
        gasUsed: 0,
        result: "success"
    },
    { call_type: "LOG", contract: "ContractA", depth: 0, gasUsed: 900 },
    {
        call_type: "RETURN",
        contract: "ContractA",
        depth: 0,
        gasUsed: 0,
        result: "success"
    }
] as TraceStep[];
