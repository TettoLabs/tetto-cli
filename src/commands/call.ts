import { intro, outro, text, spinner, note } from '@clack/prompts';
import chalk from 'chalk';
import TettoSDK, { getDefaultConfig, createWalletFromKeypair } from 'tetto-sdk';
import { Keypair } from '@solana/web3.js';
import fs from 'fs';
import os from 'os';

interface CallOptions {
  input?: string;
  text?: string;
  wallet?: string;
  network?: 'mainnet' | 'devnet';
  debug?: boolean;
}

export async function callCommand(
  agentId: string,
  options: CallOptions
) {
  intro(chalk.blue('🤖 Calling Tetto Agent'));

  try {
    // Step 1: Parse input
    let input: any;

    if (options.text) {
      input = { text: options.text };
    } else if (options.input) {
      try {
        input = JSON.parse(options.input);
      } catch (error) {
        outro(chalk.red('❌ Invalid JSON input'));
        process.exit(1);
      }
    } else {
      // Interactive input
      const inputStr = await text({
        message: 'Agent input (JSON):',
        placeholder: '{"text": "your input here"}',
        validate: (value) => {
          try {
            JSON.parse(value as string);
            return;
          } catch {
            return 'Must be valid JSON';
          }
        }
      });
      input = JSON.parse(inputStr as string);
    }

    // Step 2: Load wallet
    const walletPath = options.wallet?.replace('~', os.homedir()) ||
                       `${os.homedir()}/.solana/id.json`;

    if (!fs.existsSync(walletPath)) {
      outro(chalk.red(`❌ Wallet not found: ${walletPath}`));
      outro(chalk.dim('  Create one with: solana-keygen new'));
      process.exit(1);
    }

    const secretKey = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
    const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));
    const wallet = createWalletFromKeypair(keypair);  // SDK3: No connection!

    // Step 3: Initialize SDK3
    const config = getDefaultConfig(options.network || 'mainnet');
    if (options.debug) config.debug = true;
    const tetto = new TettoSDK(config);

    // Step 4: Call agent with beautiful progress
    const s = spinner();
    s.start('Calling agent...');

    const result = await tetto.callAgent(agentId, input, wallet);

    s.stop('Agent executed successfully!');

    // Step 5: Display beautiful output
    const box = [
      '',
      chalk.green('✅ Success!'),
      '',
      chalk.bold('Output:'),
      chalk.dim('─'.repeat(50)),
      JSON.stringify(result.output, null, 2),
      chalk.dim('─'.repeat(50)),
      '',
      chalk.dim(`Transaction: ${result.txSignature}`),
      chalk.dim(`Receipt: ${result.receiptId}`),
      '',
      chalk.cyan(`💎 Share: tetto share ${result.receiptId}`),
      chalk.cyan(`📋 Replay: tetto replay ${result.receiptId}`),
      ''
    ].join('\n');

    note(box, 'Result');

    outro(chalk.green('Done!'));

  } catch (error: any) {
    outro(chalk.red(`❌ Error: ${error.message}`));

    if (options.debug) {
      console.error(error);
    }

    process.exit(1);
  }
}
