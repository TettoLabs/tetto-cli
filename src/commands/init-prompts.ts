import prompts from 'prompts';
import chalk from 'chalk';
import { validateAgentName, validatePrice } from '../utils/validation';
import { checkProjectExists } from '../utils/files';

export interface AgentConfig {
  agentName: string;
  description: string;
  priceUSD: number;
  paymentToken: 'USDC' | 'SOL';
  agentType: 'simple' | 'complex' | 'coordinator';
  includeExamples: boolean;
}

export async function runCLI(): Promise<AgentConfig> {
  const questions: prompts.PromptObject[] = [
    {
      type: 'text',
      name: 'agentName',
      message: 'Agent name (kebab-case):',
      initial: 'my-agent',
      validate: (value: string) => {
        const nameValidation = validateAgentName(value);
        if (nameValidation !== true) return nameValidation;

        if (checkProjectExists(value)) {
          return `Directory "${value}" already exists`;
        }

        return true;
      }
    },
    {
      type: 'text',
      name: 'description',
      message: 'Description (optional):',
      initial: ''
    },
    {
      type: 'number',
      name: 'priceUSD',
      message: 'Price per call (USD):',
      initial: 0.01,
      min: 0.001,
      max: 100,
      validate: (value: number) => validatePrice(value),
      format: (value: number) => value.toFixed(3)
    },
    {
      type: 'select',
      name: 'paymentToken',
      message: 'Payment token:',
      choices: [
        {
          title: 'USDC (recommended - 99% of agents use this)',
          value: 'USDC'
        },
        {
          title: 'SOL',
          value: 'SOL'
        }
      ],
      initial: 0
    },
    {
      type: 'select',
      name: 'agentType',
      message: 'Agent type:',
      choices: [
        {
          title: 'simple (20s timeout) - Most agents',
          value: 'simple',
          description: 'For quick AI calls and basic processing'
        },
        {
          title: 'complex (120s timeout) - Heavy processing',
          value: 'complex',
          description: 'For data analysis, API calls, etc.'
        },
        {
          title: 'coordinator (180s timeout) - Multi-agent',
          value: 'coordinator',
          description: 'For calling other agents autonomously'
        }
      ],
      initial: 0
    },
    {
      type: 'confirm',
      name: 'includeExamples',
      message: 'Include example inputs?',
      initial: true
    }
  ];

  const answers = await prompts(questions, {
    onCancel: () => {
      console.log();
      console.log(chalk.yellow('Cancelled by user'));
      process.exit(0);
    }
  });

  return answers as AgentConfig;
}
