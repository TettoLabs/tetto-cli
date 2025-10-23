#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("./commands/init");
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
// Default behavior: if no command specified, run init (backwards compatible)
if (process.argv.length === 2) {
    (0, init_1.initCommand)();
}
else {
    program.parse();
}
