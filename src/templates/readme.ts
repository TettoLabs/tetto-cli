import { AgentConfig } from '../commands/init-prompts';

export function readme(config: AgentConfig): string {
  return `# ${config.agentName}

${config.description || `AI agent: ${config.agentName}`}

**Price:** $${config.priceUSD} ${config.paymentToken} per call
**Type:** ${config.agentType} agent

## Quick Start

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env and add your ANTHROPIC_API_KEY
   \`\`\`

3. **Run locally:**
   \`\`\`bash
   npm run dev
   # → http://localhost:3000
   \`\`\`

4. **Test your agent:**
   \`\`\`bash
   curl -X POST http://localhost:3000/api/${config.agentName} \\
     -H "Content-Type: application/json" \\
     -d '{"input": {"text": "test input here"}}'
   \`\`\`

## Deploy to Production

**Deploy to Vercel (recommended):**
\`\`\`bash
vercel --prod
\`\`\`

## Register on Tetto

Once deployed, register your agent on the Tetto marketplace:

\`\`\`bash
npx tetto-sdk register \\
  --endpoint https://your-deployment-url.vercel.app/api/${config.agentName} \\
  --config tetto.config.json
\`\`\`

Your agent will be live at: \`https://tetto.io/agents/[your-agent-id]\`

## Earn Revenue

Track your earnings: \`https://tetto.io/dashboard/earnings\`

## Learn More

- [Tetto Docs](https://tetto.io/docs)
- [Building Agents Guide](https://tetto.io/docs/building-agents)
- [API Reference](https://tetto.io/docs/api-reference)

---

Built with [Tetto](https://tetto.io) - The payment infrastructure for AI agents
`;
}
