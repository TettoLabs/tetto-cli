"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callCommand = callCommand;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const tetto_sdk_1 = __importStar(require("tetto-sdk"));
const web3_js_1 = require("@solana/web3.js");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
async function callCommand(agentId, options) {
    (0, prompts_1.intro)(chalk_1.default.blue('🤖 Calling Tetto Agent'));
    try {
        // Step 1: Parse input
        let input;
        if (options.text) {
            input = { text: options.text };
        }
        else if (options.input) {
            try {
                input = JSON.parse(options.input);
            }
            catch (error) {
                (0, prompts_1.outro)(chalk_1.default.red('❌ Invalid JSON input'));
                process.exit(1);
            }
        }
        else {
            // Interactive input
            const inputStr = await (0, prompts_1.text)({
                message: 'Agent input (JSON):',
                placeholder: '{"text": "your input here"}',
                validate: (value) => {
                    try {
                        JSON.parse(value);
                        return;
                    }
                    catch {
                        return 'Must be valid JSON';
                    }
                }
            });
            input = JSON.parse(inputStr);
        }
        // Step 2: Load wallet
        const walletPath = options.wallet?.replace('~', os_1.default.homedir()) ||
            `${os_1.default.homedir()}/.solana/id.json`;
        if (!fs_1.default.existsSync(walletPath)) {
            (0, prompts_1.outro)(chalk_1.default.red(`❌ Wallet not found: ${walletPath}`));
            (0, prompts_1.outro)(chalk_1.default.dim('  Create one with: solana-keygen new'));
            process.exit(1);
        }
        const secretKey = JSON.parse(fs_1.default.readFileSync(walletPath, 'utf-8'));
        const keypair = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(secretKey));
        const wallet = (0, tetto_sdk_1.createWalletFromKeypair)(keypair); // SDK3: No connection!
        // Step 3: Initialize SDK3
        const config = (0, tetto_sdk_1.getDefaultConfig)(options.network || 'mainnet');
        if (options.debug)
            config.debug = true;
        const tetto = new tetto_sdk_1.default(config);
        // Step 4: Call agent with beautiful progress
        const s = (0, prompts_1.spinner)();
        s.start('Calling agent...');
        const result = await tetto.callAgent(agentId, input, wallet);
        s.stop('Agent executed successfully!');
        // Step 5: Display beautiful output
        const box = [
            '',
            chalk_1.default.green('✅ Success!'),
            '',
            chalk_1.default.bold('Output:'),
            chalk_1.default.dim('─'.repeat(50)),
            JSON.stringify(result.output, null, 2),
            chalk_1.default.dim('─'.repeat(50)),
            '',
            chalk_1.default.dim(`Transaction: ${result.txSignature}`),
            chalk_1.default.dim(`Receipt: ${result.receiptId}`),
            '',
            chalk_1.default.cyan(`💎 Share: tetto share ${result.receiptId}`),
            chalk_1.default.cyan(`📋 Replay: tetto replay ${result.receiptId}`),
            ''
        ].join('\n');
        (0, prompts_1.note)(box, 'Result');
        (0, prompts_1.outro)(chalk_1.default.green('Done!'));
    }
    catch (error) {
        (0, prompts_1.outro)(chalk_1.default.red(`❌ Error: ${error.message}`));
        if (options.debug) {
            console.error(error);
        }
        process.exit(1);
    }
}
