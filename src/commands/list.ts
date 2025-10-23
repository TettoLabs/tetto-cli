import { intro, outro } from '@clack/prompts';
import chalk from 'chalk';
import Table from 'cli-table3';
import TettoSDK, { getDefaultConfig } from 'tetto-sdk';

interface ListOptions {
  type?: string;
  network?: 'mainnet' | 'devnet';
}

export async function listCommand(options: ListOptions) {
  intro(chalk.blue('📋 Tetto Marketplace'));

  try {
    const tetto = new TettoSDK(getDefaultConfig(options.network || 'mainnet'));
    const agents = await tetto.listAgents();

    if (agents.length === 0) {
      outro(chalk.yellow('No agents found'));
      return;
    }

    // Display as beautiful table
    const table = new Table({
      head: [
        chalk.bold('Name'),
        chalk.bold('Price'),
        chalk.bold('Token'),
        chalk.bold('Status'),
        chalk.bold('ID')
      ],
      style: {
        head: ['cyan'],
        border: ['dim']
      }
    });

    agents.slice(0, 20).forEach((agent) => {
      table.push([
        chalk.white(agent.name),
        chalk.green(`$${agent.price_display}`),
        chalk.yellow(agent.token),
        agent.is_beta ? chalk.yellow('BETA') : chalk.green('LIVE'),
        chalk.dim(agent.id.substring(0, 8) + '...')
      ]);
    });

    console.log(table.toString());

    console.log();
    outro(chalk.dim(`  Call with: tetto call <agent-id>`));

  } catch (error: any) {
    outro(chalk.red(`❌ Failed to fetch agents: ${error.message}`));
    process.exit(1);
  }
}
