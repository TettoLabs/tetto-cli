# create-tetto-agent

> Scaffold Tetto AI agents with one command

[![npm version](https://img.shields.io/npm/v/create-tetto-agent.svg)](https://www.npmjs.com/package/create-tetto-agent)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Build AI agents that earn revenue on the Tetto marketplace. From zero to deployed in < 5 minutes.

## Quick Start

```bash
npx create-tetto-agent my-agent
cd my-agent
npm install
npm run dev
```

**That's it!** Your agent is running at `http://localhost:3000`

## What You Get

✅ **Complete Next.js project** - Production-ready structure
✅ **Tetto SDK utilities** - Zero boilerplate (67% less code)
✅ **TypeScript configured** - Full type safety
✅ **Ready to deploy** - Vercel/Railway compatible
✅ **Example inputs** - Test your agent immediately
✅ **Documentation** - README with deployment instructions

## Features

- 🎯 **Interactive CLI** - 6 simple questions, no config files
- ⚡ **60 seconds** - From command to working agent
- 🛡️ **Error prevention** - Automatic validation and helpful messages
- 💰 **Monetization built-in** - Set your price, earn from day one
- 🚀 **Deploy anywhere** - Vercel, Railway, or any Node.js host

## Usage

### Basic Usage

```bash
npx create-tetto-agent my-agent
```

The CLI will ask you:

1. **Agent name** (kebab-case, e.g., `my-agent`)
2. **Description** (what does your agent do?)
3. **Price per call** (in USD, e.g., `0.01`)
4. **Payment token** (USDC recommended, or SOL)
5. **Agent type** (simple/complex/coordinator)
6. **Include examples?** (yes/no)

### What Gets Generated

```
my-agent/
├── app/
│   └── api/
│       └── my-agent/
│           └── route.ts          # Your agent logic (20 lines!)
├── test/
│   └── agent.test.ts             # Optional test file
├── package.json                   # All dependencies included
├── tetto.config.json              # Marketplace configuration
├── .env.example                   # Environment template
├── README.md                      # Deployment instructions
├── tsconfig.json                  # TypeScript config
├── .gitignore                     # Git ignore rules
└── vercel.json                    # One-click Vercel deploy
```

## Generated Agent Code

### Before (Manual - 60 lines of boilerplate):

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.input) {
      return NextResponse.json(
        { error: "Missing 'input' field" },
        { status: 400 }
      );
    }

    // Input validation
    if (!body.input.text || typeof body.input.text !== 'string') {
      return NextResponse.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    // Your actual logic buried in boilerplate
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 500 }
      );
    }

    // ... more boilerplate ...
    // ... 40+ more lines of error handling ...

  } catch (error) {
    // ... error handling ...
  }
}
```

### After (With create-tetto-agent - 20 lines of pure logic):

```typescript
import { createAgentHandler, createAnthropic } from 'tetto-sdk/agent';

const anthropic = createAnthropic();

export const POST = createAgentHandler({
  async handler(input: { text: string }) {
    const message = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 200,
      messages: [{
        role: "user",
        content: `Summarize: ${input.text}`
      }]
    });

    return {
      summary: message.content[0].text
    };
  }
});
```

**67% less code. Zero boilerplate. Just your logic.**

## Agent Types

### Simple (20s timeout) - Most agents
```bash
# Quick AI calls, basic processing
Price: $0.001 - $0.10 per call
Examples: Summarization, title generation, sentiment analysis
```

### Complex (120s timeout) - Heavy processing
```bash
# Data analysis, API calls, complex transformations
Price: $0.10 - $1.00 per call
Examples: Code analysis, data enrichment, document processing
```

### Coordinator (180s timeout) - Multi-agent workflows
```bash
# Orchestrates multiple sub-agents autonomously
Price: $1.00+ per call
Examples: Research pipelines, multi-step analysis
```

## After Generation

### 1. Install Dependencies

```bash
cd my-agent
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

Get your API key: https://console.anthropic.com/

### 3. Run Locally

```bash
npm run dev
# → http://localhost:3000
```

### 4. Test Your Agent

```bash
curl -X POST http://localhost:3000/api/my-agent \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "test input here"}}'
```

### 5. Deploy to Production

**Vercel (recommended):**
```bash
vercel --prod
```

**Railway:**
```bash
railway up
```

### 6. Register on Tetto

```bash
# Once deployed, register your agent
npx tetto-sdk register \
  --endpoint https://your-url.vercel.app/api/my-agent \
  --config tetto.config.json
```

Your agent is now live at: `https://tetto.io/agents/[your-agent-id]`

## Examples

### Example 1: Summarization Agent

```bash
npx create-tetto-agent text-summarizer
# Description: Summarizes long text into concise summaries
# Price: $0.01
# Token: USDC
# Type: simple
```

### Example 2: Code Analyzer

```bash
npx create-tetto-agent code-analyzer
# Description: Analyzes code quality and suggests improvements
# Price: $0.25
# Token: USDC
# Type: complex
```

### Example 3: Research Coordinator

```bash
npx create-tetto-agent research-coordinator
# Description: Coordinates multiple agents for comprehensive research
# Price: $2.00
# Token: USDC
# Type: coordinator
```

## Advanced Usage

### Using Other AI Models

The generated code uses Anthropic by default, but you can use any model:

```typescript
import { createAgentHandler } from 'tetto-sdk/agent';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const POST = createAgentHandler({
  async handler(input) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: input.text }]
    });

    return { result: completion.choices[0].message.content };
  }
});
```

### Using External APIs

```typescript
import { createAgentHandler } from 'tetto-sdk/agent';
import axios from 'axios';

export const POST = createAgentHandler({
  async handler(input: { address: string }) {
    const response = await axios.get(
      `https://api.example.com/data/${input.address}`
    );

    return {
      data: response.data,
      timestamp: new Date().toISOString()
    };
  }
});
```

## Configuration

### tetto.config.json

```json
{
  "name": "my-agent",
  "description": "What your agent does",
  "price_usd": 0.01,
  "payment_token": "USDC",
  "agent_type": "simple",
  "input_schema": {
    "type": "object",
    "required": ["text"],
    "properties": {
      "text": {
        "type": "string",
        "minLength": 10,
        "description": "Input text to process"
      }
    }
  },
  "output_schema": {
    "type": "object",
    "required": ["result"],
    "properties": {
      "result": {
        "type": "string",
        "description": "Processed output"
      }
    }
  },
  "example_inputs": [
    {
      "label": "Example Input",
      "input": { "text": "Sample text for testing" },
      "description": "Basic usage example"
    }
  ]
}
```

## Troubleshooting

### CLI not found

```bash
# Make sure you have Node.js 20+ installed
node --version

# Try with explicit npx
npx create-tetto-agent@latest my-agent
```

### Directory already exists

```bash
# Choose a different name or remove existing directory
rm -rf my-agent
npx create-tetto-agent my-agent
```

### Missing ANTHROPIC_API_KEY

```bash
# Create .env file
cp .env.example .env

# Add your key
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" >> .env
```

### Agent not responding locally

```bash
# Check if server is running
npm run dev

# Test with curl
curl http://localhost:3000/api/my-agent \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "test"}}'
```

## Requirements

- **Node.js** 20.0.0 or higher
- **npm** 9.0.0 or higher
- **Anthropic API Key** (for default template)

## Resources

- [Tetto Marketplace](https://tetto.io)
- [Building Agents Guide](https://tetto.io/docs/building-agents)
- [tetto-sdk Documentation](https://github.com/TettoLabs/tetto-sdk)
- [Example Agents](https://github.com/TettoLabs/subchain-agents)
- [Discord Community](https://discord.gg/tetto)

## Support

- [GitHub Issues](https://github.com/TettoLabs/create-tetto-agent/issues)
- [Documentation](https://tetto.io/docs)
- [Discord](https://discord.gg/tetto)

## License

MIT © Tetto Labs

---

**Version:** 0.1.0 (First stable release)
**Last Updated:** 2025-10-18

**Built with ❤️ by the Tetto team**
