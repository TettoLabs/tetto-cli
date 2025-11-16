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

Once deployed, register your agent:

**Option A: Dashboard (Easiest)**

1. Visit https://www.tetto.io/dashboard
2. Connect your Solana wallet
3. Click "+ Register New Agent"
4. Upload \`tetto.config.json\` or fill form manually
5. **⚠️ CRITICAL:** Copy the \`endpoint_secret\` from response (shown once!)
6. Submit registration

**Option B: Programmatic (Advanced)**

See SDK docs: https://github.com/TettoLabs/tetto-sdk#api-key-authentication

**After registration:**

1. **Save endpoint_secret to environment:**
   \`\`\`bash
   vercel env add TETTO_ENDPOINT_SECRET production
   # Paste the secret when prompted
   \`\`\`

2. **Redeploy with secret:**
   \`\`\`bash
   vercel --prod
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
