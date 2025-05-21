export interface TraceStep {
    call_type:
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
