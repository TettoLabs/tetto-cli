#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("./prompts");
const generator_1 = require("./generator");
const logger_1 = require("./utils/logger");
async function main() {
    try {
        // Welcome message
        logger_1.logger.welcome();
        // Run interactive prompts
        const config = await (0, prompts_1.runCLI)();
        // Generate project files
        await (0, generator_1.generateAgent)(config);
    }
    catch (error) {
        logger_1.logger.error(error);
        process.exit(1);
    }
}
main();
