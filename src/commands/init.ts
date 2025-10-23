import { runCLI } from './init-prompts';
import { generateAgent } from './init-generator';
import { logger } from '../utils/logger';

export async function initCommand(name?: string) {
  try {
    // Welcome message
    logger.welcome();

    // Run interactive prompts (or use provided name)
    const config = await runCLI();

    // Generate project files
    await generateAgent(config);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}
