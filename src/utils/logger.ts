import chalk from 'chalk';

export const logger = {
  welcome() {
    console.log();
    console.log(chalk.bold.cyan('🎨 Create Tetto Agent'));
    console.log(chalk.gray('Build AI agents that earn revenue on Tetto marketplace'));
    console.log();
  },

  info(message: string) {
    console.log(chalk.blue('ℹ'), message);
  },

  step(message: string) {
    console.log(chalk.gray('  ✓'), message);
  },

  success(agentName: string) {
    console.log();
    console.log(chalk.green('✅ Agent created successfully!'));
    console.log();
    console.log(chalk.bold('Project:'), agentName);
  },

  error(error: unknown) {
    console.log();
    console.log(chalk.red('✗ Error:'), error instanceof Error ? error.message : String(error));
    console.log();
  },

  nextSteps(agentName: string) {
    console.log(chalk.bold('Next steps:'));
    console.log();
    console.log(chalk.gray('  1.'), `cd ${agentName}`);
    console.log(chalk.gray('  2.'), 'npm install');
    console.log(chalk.gray('  3.'), 'npm run dev');
    console.log();
    console.log(chalk.bold('After deploying:'));
    console.log(chalk.gray('  •'), chalk.cyan('https://tetto.io/dashboard/profile'));
    console.log(chalk.gray('     Complete your profile & create studio page'));
    console.log();
    console.log(chalk.gray('Learn more:'), chalk.cyan('https://tetto.io/docs/building-agents'));
    console.log();
  }
};
