export interface AgentConfig {
    agentName: string;
    description: string;
    priceUSD: number;
    paymentToken: 'USDC' | 'SOL';
    agentType: 'simple' | 'complex' | 'coordinator';
    includeExamples: boolean;
}
export declare function runCLI(): Promise<AgentConfig>;
