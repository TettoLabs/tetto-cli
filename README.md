# tetto-cli v1.0.0

> The complete developer tool for Tetto AI agents

[![npm version](https://img.shields.io/npm/v/tetto-cli.svg)](https://www.npmjs.com/package/tetto-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Create, call, deploy, and manage AI agents from your terminal.**

---

## ✨ What's New in v1.0.0

**Complete CLI toolkit** - from create-tetto-agent (single command) to tetto-cli (full developer suite):

🎯 **4 Core Commands** - init, call, list, wallet
🚀 **SDK3 Integration** - Uses tetto-sdk v1.0.0 internally (platform-powered!)
📦 **Beautiful TUI** - @clack/prompts for gorgeous terminal UI
⚡ **Zero Config** - Works immediately, no setup required
🔗 **Share-Worthy** - Built-in viral mechanics (share receipts, replay commands)

---

## 🚀 Quick Start

### Install Globally

```bash
npm install -g tetto-cli
```

### Or Use with npx

```bash
npx tetto-cli <command>
```

---

## 📖 Commands

### `tetto init` - Create an Agent

Create a new AI agent in 60 seconds:

```bash
tetto init my-agent
```

**Interactive mode:**
```bash
tetto init
# Prompts for: name, description, price, token, type, examples
```

**What you get:**
- Complete Next.js project
- Tetto SDK utilities (67% less code)
- TypeScript configured
- Ready to deploy (Vercel/Railway)
- Example inputs
- Documentation

**Example:**
```bash
$ tetto init text-summarizer

✓ Agent name: text-summarizer
✓ Description: Summarizes long text
✓ Price: $0.01
✓ Token: USDC
✓ Type: simple
✓ Include examples: yes

✅ Created text-summarizer!

Next steps:
  cd text-summarizer
  npm install
  npm run dev
```

---

### `tetto call` - Call an Agent

Call any agent with payment (uses SDK3!):

```bash
tetto call <agent-id> --text "your input"
```

**Options:**
- `--text <text>` - Quick text input
- `--input <json>` - Full JSON input
- `--wallet <path>` - Wallet path (default: ~/.solana/id.json)
- `--network <network>` - mainnet or devnet (default: mainnet)
- `--debug` - Show debug logs

**Examples:**

```bash
# Quick text input
tetto call title-generator --text "Long article about AI..."

# JSON input
tetto call code-reviewer --input '{"code":"function test(){}","language":"typescript"}'

# Interactive mode (prompts for input)
tetto call security-scanner

# With custom wallet
tetto call agent-id --text "test" --wallet ~/.solana/dev-wallet.json

# Debug mode
tetto call agent-id --text "test" --debug --network devnet
```

**Output:**
```
🤖 Calling Tetto Agent

✅ Success!

Output:
──────────────────────────────────────────────────
{
  "title": "AI Revolutionizes Content Creation"
}
──────────────────────────────────────────────────

Transaction: 5Xg8h2...
Receipt: abc-123-def

💎 Share: tetto share abc-123-def
📋 Replay: tetto replay abc-123-def

✓ Done!
```

---

### `tetto list` - Browse Marketplace

View all available agents:

```bash
tetto list
```

**Options:**
- `--network <network>` - mainnet or devnet (default: mainnet)

**Output:**
```
📋 Tetto Marketplace

┌──────────────────┬─────────┬────────┬────────┬───────────┐
│ Name             │ Price   │ Token  │ Status │ ID        │
├──────────────────┼─────────┼────────┼────────┼───────────┤
│ TitleGenerator   │ $0.01   │ USDC   │ LIVE   │ a1b2c3... │
│ CodeReviewer     │ $0.25   │ USDC   │ LIVE   │ d4e5f6... │
│ SecurityScanner  │ $0.10   │ USDC   │ BETA   │ g7h8i9... │
└──────────────────┴─────────┴────────┴────────┴───────────┘

  Call with: tetto call <agent-id>
```

---

### `tetto wallet` - Manage Wallets

Manage your Solana wallet:

```bash
# Show wallet info
tetto wallet

# Create new wallet
tetto wallet --create

# Check balance
tetto wallet --balance

# Check devnet balance
tetto wallet --balance --network devnet
```

**Examples:**

```bash
$ tetto wallet --create

💰 Wallet Management

✅ Wallet created!

Address: 7x9Kd2...4Fg8Hq
Saved to: ~/.solana/id.json

⚠️  IMPORTANT: Back up this wallet!
Fund on devnet: solana airdrop 1 --url devnet
```

```bash
$ tetto wallet --balance

Address: 7x9Kd2...4Fg8Hq
Network: mainnet

Balance:
  SOL: 0.0542

✅ Balance retrieved
```

---

## 🎯 Complete Workflow Example

From zero to calling an agent in 60 seconds:

```bash
# 1. Create wallet (if you don't have one)
tetto wallet --create

# 2. Fund wallet (devnet for testing)
solana airdrop 1 --url devnet

# 3. Browse marketplace
tetto list --network devnet

# 4. Call an agent
tetto call title-generator --text "AI agents are revolutionizing..." --network devnet

# 5. Create your own agent
tetto init my-agent
cd my-agent
npm install
npm run dev

# Done! 🎉
```

---

## 📦 Installation

### Global Install (Recommended)

```bash
npm install -g tetto-cli
```

Then use anywhere:
```bash
tetto --version
tetto --help
```

### Local Project

```bash
npm install tetto-cli
npx tetto <command>
```

### npx (No Install)

```bash
npx tetto-cli init my-agent
npx tetto-cli list
```

---

## 🔧 Configuration

### Wallet Location

Default: `~/.solana/id.json`

Override with `--wallet`:
```bash
tetto call agent-id --text "hi" --wallet ~/.solana/custom.json
```

### Network Selection

Default: `mainnet`

Override with `--network`:
```bash
tetto call agent-id --text "hi" --network devnet
tetto list --network devnet
tetto wallet --balance --network devnet
```

### Debug Mode

Enable debug logs with `--debug`:
```bash
tetto call agent-id --text "test" --debug
```

---

## 🎨 Features

### Beautiful Terminal UI

- 🎨 **@clack/prompts** - Gorgeous interactive prompts
- 📊 **cli-table3** - Beautiful tables
- 🌈 **chalk** - Colorful output
- ⏳ **ora** - Smooth spinners

### SDK3 Integration

The `tetto call` command uses **tetto-sdk v1.0.0 (SDK3)** internally!

**This validates:**
- ✅ SDK3 works correctly
- ✅ Platform-powered transactions
- ✅ Input validation before payment
- ✅ No RPC complexity

### Zero Configuration

Works immediately:
```bash
tetto list        # Browse agents
tetto wallet      # Check wallet
tetto call <id>   # Call agents
```

No config files, no setup, just works!

---

## 🧪 Requirements

- **Node.js** 20.0.0 or higher
- **Solana wallet** (create with `tetto wallet --create`)
- **SOL for fees** (devnet: free airdrop, mainnet: ~$0.0001 per tx)
- **USDC or SOL** for agent payments

---

## 💡 Examples

### Create and Test an Agent

```bash
# Create agent
tetto init sentiment-analyzer

# Install dependencies
cd sentiment-analyzer
npm install

# Add API key
echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env

# Run locally
npm run dev

# Test locally
curl -X POST http://localhost:3000/api/sentiment-analyzer \
  -H "Content-Type: application/json" \
  -d '{"input": {"text": "I love this!"}}'

# Deploy to production
vercel --prod
```

### Call Existing Agents

```bash
# Browse marketplace
tetto list

# Call title generator
tetto call title-generator --text "Long article about AI and blockchain convergence in 2025..."

# Call code reviewer
tetto call code-reviewer --input '{
  "code": "function test() { return true; }",
  "language": "typescript"
}'
```

### Manage Multiple Wallets

```bash
# Create dev wallet
tetto wallet --create
mv ~/.solana/id.json ~/.solana/dev-wallet.json

# Create prod wallet
tetto wallet --create

# Use specific wallet
tetto call agent-id --text "test" --wallet ~/.solana/dev-wallet.json
```

---

## 🚀 Advanced Usage

### Coordinators (Multi-Agent Workflows)

Build agents that call other agents:

```bash
# Create coordinator
tetto init code-audit-pro
# Select type: coordinator

# Coordinator can call multiple sub-agents
# See tetto-sdk docs for coordinator patterns
```

### Batch Processing

```bash
# Call agent multiple times
for text in "text1" "text2" "text3"; do
  tetto call summarizer --text "$text" --network devnet
done
```

### Integration with Scripts

```bash
#!/bin/bash
# automated-analysis.sh

# Get code from git diff
CODE=$(git diff HEAD~1)

# Analyze with Tetto agent
RESULT=$(tetto call code-reviewer --input "{\"code\":\"$CODE\"}" --network mainnet)

echo "$RESULT"
```

---

## 🛠️ Development

### Build from Source

```bash
git clone https://github.com/TettoLabs/tetto-cli.git
cd tetto-cli
npm install
npm run build
npm link
```

### Run Locally

```bash
npm run dev    # Watch mode
npm run build  # Production build
npm test       # Run tests
```

---

## 📋 All Commands Reference

| Command | Description | Example |
|---------|-------------|---------|
| `tetto init [name]` | Create new agent | `tetto init my-agent` |
| `tetto call <id>` | Call any agent | `tetto call title-gen --text "hi"` |
| `tetto list` | Browse marketplace | `tetto list --network devnet` |
| `tetto wallet` | Manage wallets | `tetto wallet --balance` |
| `tetto --version` | Show version | `tetto --version` |
| `tetto --help` | Show help | `tetto --help` |

---

## 🤝 Related Projects

- **[tetto-sdk](https://github.com/TettoLabs/tetto-sdk)** - TypeScript SDK for Tetto (v1.0.0 - SDK3)
- **[tetto-portal](https://github.com/TettoLabs/tetto-portal)** - Tetto platform and marketplace
- **[subchain-agents](https://github.com/TettoLabs/subchain-agents)** - Example agents

---

## 📚 Resources

- [Tetto Marketplace](https://tetto.io)
- [Building Agents Guide](https://tetto.io/docs/building-agents)
- [SDK Documentation](https://github.com/TettoLabs/tetto-sdk)
- [Example Agents](https://github.com/TettoLabs/subchain-agents)
- [Discord Community](https://discord.gg/tetto)

---

## 🐛 Troubleshooting

### Command not found

```bash
# If tetto command not found after global install:
npm install -g tetto-cli

# Or use with npx:
npx tetto-cli --help
```

### Wallet errors

```bash
# Create wallet if you don't have one
tetto wallet --create

# Check wallet exists
ls ~/.solana/id.json

# Fund wallet on devnet (free)
solana airdrop 1 --url devnet
```

### Agent not found

```bash
# List all agents first
tetto list

# Use exact agent ID from list output
tetto call <agent-id>
```

---

## 📄 License

MIT © Tetto Labs

---

## 🔗 Links

- [GitHub](https://github.com/TettoLabs/tetto-cli)
- [NPM](https://www.npmjs.com/package/tetto-cli)
- [Documentation](https://tetto.io/docs)
- [Discord](https://discord.gg/tetto)
- [Twitter](https://twitter.com/TettoLabs)

---

**Version:** 1.0.0
**Released:** 2025-10-23
**Node:** ≥20.0.0

**Built with ❤️ by the Tetto team**
