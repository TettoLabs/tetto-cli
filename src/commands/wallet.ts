import { intro, outro, select } from '@clack/prompts';
import chalk from 'chalk';
import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import fs from 'fs';
import os from 'os';

interface WalletOptions {
  balance?: boolean;
  create?: boolean;
  export?: boolean;
  network?: 'mainnet' | 'devnet';
}

const RPC_URLS = {
  mainnet: 'https://api.mainnet-beta.solana.com',
  devnet: 'https://api.devnet.solana.com'
};

export async function walletCommand(options: WalletOptions) {
  intro(chalk.blue('💰 Wallet Management'));

  const walletPath = `${os.homedir()}/.solana/id.json`;

  if (options.create) {
    // Create new wallet
    const keypair = Keypair.generate();
    const secretKey = Array.from(keypair.secretKey);

    fs.mkdirSync(`${os.homedir()}/.solana`, { recursive: true });
    fs.writeFileSync(walletPath, JSON.stringify(secretKey));

    outro(chalk.green('✅ Wallet created!'));
    console.log();
    console.log(chalk.bold('Address:'), keypair.publicKey.toBase58());
    console.log(chalk.dim('Saved to:'), walletPath);
    console.log();
    console.log(chalk.yellow('⚠️  IMPORTANT: Back up this wallet!'));
    console.log(chalk.dim('Fund on devnet: solana airdrop 1 --url devnet'));
    return;
  }

  if (options.balance) {
    // Show balance
    if (!fs.existsSync(walletPath)) {
      outro(chalk.red('❌ Wallet not found'));
      outro(chalk.dim('  Create with: tetto wallet --create'));
      return;
    }

    const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const network = options.network || 'mainnet';
    const connection = new Connection(RPC_URLS[network]);

    console.log(chalk.bold('Address:'), keypair.publicKey.toBase58());
    console.log(chalk.dim('Network:'), network);
    console.log();

    try {
      const balance = await connection.getBalance(keypair.publicKey);
      const solBalance = balance / LAMPORTS_PER_SOL;

      console.log(chalk.green('Balance:'));
      console.log(chalk.dim('  SOL:'), chalk.white(solBalance.toFixed(4)));
      // TODO: Add USDC balance check
      console.log();

      outro(chalk.green('✅ Balance retrieved'));
    } catch (error: any) {
      outro(chalk.red(`❌ Failed to fetch balance: ${error.message}`));
      process.exit(1);
    }
    return;
  }

  // Default: show wallet info
  if (fs.existsSync(walletPath)) {
    const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

    console.log(chalk.bold('Wallet:'), walletPath);
    console.log(chalk.bold('Address:'), keypair.publicKey.toBase58());
    console.log();
    outro(chalk.dim('Use --balance to check balance, --create to create new wallet'));
  } else {
    outro(chalk.yellow('No wallet found'));
    outro(chalk.dim('  Create with: tetto wallet --create'));
  }
}
