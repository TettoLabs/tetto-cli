"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tettoConfig = tettoConfig;
function tettoConfig(config) {
    const outputField = inferOutputField(config.description);
    const exampleInputs = config.includeExamples
        ? [
            {
                label: 'Example Input',
                input: { text: 'Sample text for testing your agent' },
                description: 'Basic usage example'
            }
        ]
        : [];
    return JSON.stringify({
        name: config.agentName,
        description: config.description || `AI agent: ${config.agentName}`,
        price_usd: config.priceUSD,
        payment_token: config.paymentToken,
        agent_type: config.agentType,
        input_schema: {
            type: 'object',
            required: ['text'],
            properties: {
                text: {
                    type: 'string',
                    minLength: 10,
                    description: 'Input text to process'
                }
            }
        },
        output_schema: {
            type: 'object',
            required: [outputField],
            properties: {
                [outputField]: {
                    type: 'string',
                    description: 'Processed output'
                }
            }
        },
        example_inputs: exampleInputs
    }, null, 2);
}
function inferOutputField(description) {
    const lower = description.toLowerCase();
    if (lower.includes('summar'))
        return 'summary';
    if (lower.includes('title'))
        return 'title';
    if (lower.includes('analyz') || lower.includes('analyse'))
        return 'analysis';
    return 'result';
}
