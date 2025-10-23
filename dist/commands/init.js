"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = initCommand;
const init_prompts_1 = require("./init-prompts");
const init_generator_1 = require("./init-generator");
const logger_1 = require("../utils/logger");
async function initCommand(name) {
    try {
        // Welcome message
        logger_1.logger.welcome();
        // Run interactive prompts (or use provided name)
        const config = await (0, init_prompts_1.runCLI)();
        // Generate project files
        await (0, init_generator_1.generateAgent)(config);
    }
    catch (error) {
        logger_1.logger.error(error);
        process.exit(1);
    }
}
