"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envExample = envExample;
function envExample(config) {
    const coordinatorSection = config.agentType === 'coordinator'
        ? `
# For coordinators only:
COORDINATOR_WALLET_SECRET='[...]'
TETTO_API_URL=https://tetto.io
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
`
        : '';
    return `# Required: Anthropic API key for Claude
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Optional: Claude model to use (defaults to claude-3-5-haiku-20241022)
CLAUDE_MODEL=claude-3-5-haiku-20241022
${coordinatorSection}`;
}
