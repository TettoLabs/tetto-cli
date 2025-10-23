#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { callCommand } from './commands/call';

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

// Default behavior: if no command specified, run init (backwards compatible)
if (process.argv.length === 2) {
  initCommand();
} else {
  program.parse();
}
