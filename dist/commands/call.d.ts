interface CallOptions {
    input?: string;
    text?: string;
    wallet?: string;
    network?: 'mainnet' | 'devnet';
    debug?: boolean;
}
export declare function callCommand(agentId: string, options: CallOptions): Promise<void>;
export {};
