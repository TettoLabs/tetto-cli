export declare const logger: {
    welcome(): void;
    info(message: string): void;
    step(message: string): void;
    success(agentName: string): void;
    error(error: unknown): void;
    nextSteps(agentName: string): void;
};
