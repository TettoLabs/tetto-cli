#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';

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

// Default behavior: if no command specified, run init (backwards compatible)
if (process.argv.length === 2) {
  initCommand();
} else {
  program.parse();
}
