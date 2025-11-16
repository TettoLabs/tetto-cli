"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coordinatorRouteFile = coordinatorRouteFile;
function coordinatorRouteFile(config) {
    return `import { createAgentHandler, TettoSDK } from 'tetto-sdk/agent';
import type { AgentRequestContext } from 'tetto-sdk/agent';
import { Keypair } from '@solana/web3.js';
import { createWalletFromKeypair } from 'tetto-sdk';

/**
 * Load operational wallet from environment
 * This wallet pays for sub-agent calls
 */
function getOperationalWallet() {
  if (!process.env.COORDINATOR_OPERATIONAL_SECRET) {
    throw new Error(
      'COORDINATOR_OPERATIONAL_SECRET not set.\\n\\n' +
      'Setup:\\n' +
      '1. Generate wallet: solana-keygen new --outfile coordinator-wallet.json\\n' +
      '2. Get secret: cat coordinator-wallet.json\\n' +
      '3. Add to .env: COORDINATOR_OPERATIONAL_SECRET=[64-element array]\\n' +
      '4. Fund wallet with USDC\\n\\n' +
      'Learn more: https://github.com/TettoLabs/tetto-sdk/blob/main/docs/building-agents/operational-wallet-guide.md'
    );
  }

  const secretArray = JSON.parse(process.env.COORDINATOR_OPERATIONAL_SECRET);
  const secretKey = Uint8Array.from(secretArray);
  const keypair = Keypair.fromSecretKey(secretKey);
  return createWalletFromKeypair(keypair);
}

export const POST = createAgentHandler({
  async handler(input: { task: string }, context: AgentRequestContext) {
    // Validate input
    if (!input?.task || typeof input.task !== 'string') {
      throw new Error('Invalid input: task field is required (string)');
    }

    // Initialize SDK (auto-configured from context)
    const tetto = TettoSDK.fromContext(context.tetto_context);
    const operationalWallet = getOperationalWallet();

    // Get sub-agent ID from environment
    const subAgentId = process.env.SUB_AGENT_ID;
    if (!subAgentId) {
      throw new Error(
        'SUB_AGENT_ID environment variable not set.\\n' +
        'Find agents at: https://tetto.io/agents\\n' +
        'Add to .env: SUB_AGENT_ID=your-chosen-agent-id'
      );
    }

    // Call sub-agent
    const result = await tetto.callAgent(
      subAgentId,
      { text: input.task },
      operationalWallet
    );

    return {
      result: result.output,
      cost_usdc: (result.agentReceived + result.protocolFee) / 1e6
    };
  }
});
`;
}
