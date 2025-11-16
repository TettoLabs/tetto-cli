"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeFile = routeFile;
function routeFile(config) {
    const outputField = inferOutputField(config.description);
    const prompt = generatePrompt(config.description, config.agentName);
    return `import { createAgentHandler, createAnthropic } from 'tetto-sdk/agent';
import type { AgentRequestContext } from 'tetto-sdk/agent';

const anthropic = createAnthropic();

export const POST = createAgentHandler({
  async handler(input: { text: string }, context: AgentRequestContext) {
    const message = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || "claude-3-5-haiku-20241022",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: \`${prompt}: \${input.text}\`
      }]
    });

    const result = message.content[0].type === "text"
      ? message.content[0].text.trim()
      : "";

    return {
      ${outputField}: result
    };
  }
});
`;
}
function inferOutputField(description) {
    const lower = description.toLowerCase();
    if (lower.includes('summar'))
        return 'summary';
    if (lower.includes('title'))
        return 'title';
    if (lower.includes('analyz') || lower.includes('analyse'))
        return 'analysis';
    if (lower.includes('translat'))
        return 'translation';
    if (lower.includes('code'))
        return 'code';
    if (lower.includes('extract'))
        return 'extracted';
    return 'result'; // default
}
function generatePrompt(description, agentName) {
    if (!description) {
        return 'Process the following text';
    }
    // Use description as prompt base
    const firstSentence = description.split('.')[0].trim();
    if (firstSentence.length > 0) {
        return firstSentence;
    }
    // Fallback: use agent name
    return agentName.replace(/-/g, ' ');
}
