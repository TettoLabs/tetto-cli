import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { AgentConfig } from './prompts';
import { logger } from './utils/logger';
import { getProjectPath } from './utils/files';
import * as templates from './templates';

export async function generateAgent(config: AgentConfig): Promise<void> {
  const projectPath = getProjectPath(config.agentName);

  logger.info(`Creating agent: ${config.agentName}`);
  console.log();

  try {
    // Step 1: Create project directory
    logger.step('Creating project directory...');
    mkdirSync(projectPath, { recursive: true });

    // Step 2: Create subdirectories
    logger.step('Creating directory structure...');
    mkdirSync(join(projectPath, 'app/api', config.agentName), { recursive: true });
    mkdirSync(join(projectPath, 'test'), { recursive: true });

    // Step 3: Generate files
    const files = [
      {
        path: 'package.json',
        content: templates.packageJson(config),
        description: 'package.json'
      },
      {
        path: `app/api/${config.agentName}/route.ts`,
        content: templates.routeFile(config),
        description: 'agent endpoint'
      },
      {
        path: 'tetto.config.json',
        content: templates.tettoConfig(config),
        description: 'tetto config'
      },
      {
        path: '.env.example',
        content: templates.envExample(config),
        description: 'environment template'
      },
      {
        path: 'README.md',
        content: templates.readme(config),
        description: 'README'
      },
      {
        path: 'tsconfig.json',
        content: templates.tsConfig(),
        description: 'TypeScript config'
      },
      {
        path: '.gitignore',
        content: templates.gitignore(),
        description: '.gitignore'
      },
      {
        path: 'vercel.json',
        content: templates.vercelConfig(),
        description: 'Vercel config'
      }
    ];

    for (const file of files) {
      logger.step(`Creating ${file.description}...`);
      writeFileSync(join(projectPath, file.path), file.content, 'utf-8');
    }

    console.log();
    logger.success(config.agentName);
    logger.nextSteps(config.agentName);
  } catch (error) {
    logger.error(error);
    throw error;
  }
}
