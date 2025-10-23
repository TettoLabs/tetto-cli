"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletCommand = walletCommand;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const RPC_URLS = {
    mainnet: 'https://api.mainnet-beta.solana.com',
    devnet: 'https://api.devnet.solana.com'
};
async function walletCommand(options) {
    (0, prompts_1.intro)(chalk_1.default.blue('💰 Wallet Management'));
    const walletPath = `${os_1.default.homedir()}/.solana/id.json`;
    if (options.create) {
        // Create new wallet
        const keypair = web3_js_1.Keypair.generate();
        const secretKey = Array.from(keypair.secretKey);
        fs_1.default.mkdirSync(`${os_1.default.homedir()}/.solana`, { recursive: true });
        fs_1.default.writeFileSync(walletPath, JSON.stringify(secretKey));
        (0, prompts_1.outro)(chalk_1.default.green('✅ Wallet created!'));
        console.log();
        console.log(chalk_1.default.bold('Address:'), keypair.publicKey.toBase58());
        console.log(chalk_1.default.dim('Saved to:'), walletPath);
        console.log();
        console.log(chalk_1.default.yellow('⚠️  IMPORTANT: Back up this wallet!'));
        console.log(chalk_1.default.dim('Fund on devnet: solana airdrop 1 --url devnet'));
        return;
    }
    if (options.balance) {
        // Show balance
        if (!fs_1.default.existsSync(walletPath)) {
            (0, prompts_1.outro)(chalk_1.default.red('❌ Wallet not found'));
            (0, prompts_1.outro)(chalk_1.default.dim('  Create with: tetto wallet --create'));
            return;
        }
        const secretKey = JSON.parse(fs_1.default.readFileSync(walletPath, 'utf-8'));
        const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secretKey));
        const network = options.network || 'mainnet';
        const connection = new web3_js_1.Connection(RPC_URLS[network]);
        console.log(chalk_1.default.bold('Address:'), keypair.publicKey.toBase58());
        console.log(chalk_1.default.dim('Network:'), network);
        console.log();
        try {
            const balance = await connection.getBalance(keypair.publicKey);
            const solBalance = balance / web3_js_1.LAMPORTS_PER_SOL;
            console.log(chalk_1.default.green('Balance:'));
            console.log(chalk_1.default.dim('  SOL:'), chalk_1.default.white(solBalance.toFixed(4)));
            // TODO: Add USDC balance check
            console.log();
            (0, prompts_1.outro)(chalk_1.default.green('✅ Balance retrieved'));
        }
        catch (error) {
            (0, prompts_1.outro)(chalk_1.default.red(`❌ Failed to fetch balance: ${error.message}`));
            process.exit(1);
        }
        return;
    }
    // Default: show wallet info
    if (fs_1.default.existsSync(walletPath)) {
        const secretKey = JSON.parse(fs_1.default.readFileSync(walletPath, 'utf-8'));
        const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secretKey));
        console.log(chalk_1.default.bold('Wallet:'), walletPath);
        console.log(chalk_1.default.bold('Address:'), keypair.publicKey.toBase58());
        console.log();
        (0, prompts_1.outro)(chalk_1.default.dim('Use --balance to check balance, --create to create new wallet'));
    }
    else {
        (0, prompts_1.outro)(chalk_1.default.yellow('No wallet found'));
        (0, prompts_1.outro)(chalk_1.default.dim('  Create with: tetto wallet --create'));
    }
}
