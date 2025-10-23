interface WalletOptions {
    balance?: boolean;
    create?: boolean;
    export?: boolean;
    network?: 'mainnet' | 'devnet';
}
export declare function walletCommand(options: WalletOptions): Promise<void>;
export {};
