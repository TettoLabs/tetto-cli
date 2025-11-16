#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
const call_1 = require("./commands/call");
const list_1 = require("./commands/list");
const wallet_1 = require("./commands/wallet");
const program = new commander_1.Command();
program
    .name('tetto')
    .description('The complete developer tool for Tetto AI agents')
    .version('1.0.0');
// tetto init - Create a new AI agent
program
    .command('init')
    .description('Create a new AI agent')
    .argument('[name]', 'Agent name (kebab-case)')
    .action(init_1.initCommand);
// tetto call - Call any AI agent (uses Tetto SDK v2.5.1)
program
    .command('call')
    .description('Call any AI agent')
    .argument('<agent-id>', 'Agent ID or name')
    .option('-i, --input <json>', 'Input as JSON')
    .option('--text <text>', 'Quick text input')
    .option('-w, --wallet <path>', 'Wallet path', '~/.solana/id.json')
    .option('--network <network>', 'Network (mainnet|devnet)', 'mainnet')
    .option('--debug', 'Debug mode')
    .action(call_1.callCommand);
// tetto list - Browse marketplace
program
    .command('list')
    .description('Browse agent marketplace')
    .option('--type <type>', 'Filter by type (simple|complex|coordinator)')
    .option('--network <network>', 'Network (mainnet|devnet)', 'mainnet')
    .action(list_1.listCommand);
// tetto wallet - Manage wallets
program
    .command('wallet')
    .description('Manage wallets')
    .option('--balance', 'Show balance')
    .option('--create', 'Create new wallet')
    .option('--network <network>', 'Network for balance check', 'mainnet')
    .action(wallet_1.walletCommand);
// Default behavior: if no command specified, run init (backwards compatible)
if (process.argv.length === 2) {
    (0, init_1.initCommand)();
}
else {
    program.parse();
}
