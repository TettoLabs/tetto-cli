#!/usr/bin/env node

import { runCLI } from './prompts';
import { generateAgent } from './generator';
import { logger } from './utils/logger';

async function main() {
  try {
    // Welcome message
    logger.welcome();

    // Run interactive prompts
    const config = await runCLI();

    // Generate project files
    await generateAgent(config);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

main();
