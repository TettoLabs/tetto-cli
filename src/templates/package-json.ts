import { AgentConfig } from '../prompts';

export function packageJson(config: AgentConfig): string {
  return JSON.stringify(
    {
      name: config.agentName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        test: 'tsx test/agent.test.ts',
        deploy: 'vercel --prod'
      },
      dependencies: {
        '@anthropic-ai/sdk': '^0.35.0',
        next: '15.0.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        'tetto-sdk': '^0.1.0'
      },
      devDependencies: {
        '@types/node': '^20.0.0',
        '@types/react': '^19.0.0',
        tsx: '^4.20.0',
        typescript: '^5.0.0'
      },
      engines: {
        node: '>=20.0.0'
      }
    },
    null,
    2
  );
}
