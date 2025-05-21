export interface TransactionData {
    hash: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    input: string;
    gasPrice: string;
    blockNumber: string;
    gasUsed?: string;
}
