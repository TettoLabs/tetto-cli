"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envExample = envExample;
function envExample(config) {
    const coordinatorSection = config.agentType === 'coordinator'
        ? `
# For coordinators only:
# Generate: solana-keygen new --outfile coordinator-wallet.json
# Paste the 64-element array from the wallet file:
COORDINATOR_OPERATIONAL_SECRET='[paste array from coordinator-wallet.json]'

# Sub-agent to call (find agents at https://tetto.io/agents)
SUB_AGENT_ID=your-chosen-sub-agent-id
`
        : '';
    return `# Required: Anthropic API key for Claude
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Required: Endpoint secret (from agent registration response)
# You'll get this after registering your agent
# IMPORTANT: Save it immediately - shown only once!
TETTO_ENDPOINT_SECRET=<from-registration-response>

# Optional: Claude model to use (defaults to claude-3-5-haiku-20241022)
CLAUDE_MODEL=claude-3-5-haiku-20241022
${coordinatorSection}`;
}
