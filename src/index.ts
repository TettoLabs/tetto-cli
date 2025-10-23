#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { callCommand } from './commands/call';
import { listCommand } from './commands/list';
import { walletCommand } from './commands/wallet';

const program = new Command();

program
  .name('tetto')
  .description('The complete developer tool for Tetto AI agents')
  .version('1.0.0');

// tetto init - Create a new AI agent
program
  .command('init')
  .description('Create a new AI agent')
  .argument('[name]', 'Agent name (kebab-case)')
  .action(initCommand);

// tetto call - Call any AI agent (uses SDK3!)
program
  .command('call')
  .description('Call any AI agent')
  .argument('<agent-id>', 'Agent ID or name')
  .option('-i, --input <json>', 'Input as JSON')
  .option('--text <text>', 'Quick text input')
  .option('-w, --wallet <path>', 'Wallet path', '~/.solana/id.json')
  .option('--network <network>', 'Network (mainnet|devnet)', 'mainnet')
  .option('--debug', 'Debug mode')
  .action(callCommand);

// tetto list - Browse marketplace
program
  .command('list')
  .description('Browse agent marketplace')
  .option('--type <type>', 'Filter by type (simple|complex|coordinator)')
  .option('--network <network>', 'Network (mainnet|devnet)', 'mainnet')
  .action(listCommand);

// tetto wallet - Manage wallets
program
  .command('wallet')
  .description('Manage wallets')
  .option('--balance', 'Show balance')
  .option('--create', 'Create new wallet')
  .option('--network <network>', 'Network for balance check', 'mainnet')
  .action(walletCommand);

// Default behavior: if no command specified, run init (backwards compatible)
if (process.argv.length === 2) {
  initCommand();
} else {
  program.parse();
}
