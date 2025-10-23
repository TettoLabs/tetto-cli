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
exports.listCommand = listCommand;
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const cli_table3_1 = __importDefault(require("cli-table3"));
const tetto_sdk_1 = __importStar(require("tetto-sdk"));
async function listCommand(options) {
    (0, prompts_1.intro)(chalk_1.default.blue('📋 Tetto Marketplace'));
    try {
        const tetto = new tetto_sdk_1.default((0, tetto_sdk_1.getDefaultConfig)(options.network || 'mainnet'));
        const agents = await tetto.listAgents();
        if (agents.length === 0) {
            (0, prompts_1.outro)(chalk_1.default.yellow('No agents found'));
            return;
        }
        // Display as beautiful table
        const table = new cli_table3_1.default({
            head: [
                chalk_1.default.bold('Name'),
                chalk_1.default.bold('Price'),
                chalk_1.default.bold('Token'),
                chalk_1.default.bold('Status'),
                chalk_1.default.bold('ID')
            ],
            style: {
                head: ['cyan'],
                border: ['dim']
            }
        });
        agents.slice(0, 20).forEach((agent) => {
            table.push([
                chalk_1.default.white(agent.name),
                chalk_1.default.green(`$${agent.price_display}`),
                chalk_1.default.yellow(agent.token),
                agent.is_beta ? chalk_1.default.yellow('BETA') : chalk_1.default.green('LIVE'),
                chalk_1.default.dim(agent.id.substring(0, 8) + '...')
            ]);
        });
        console.log(table.toString());
        console.log();
        (0, prompts_1.outro)(chalk_1.default.dim(`  Call with: tetto call <agent-id>`));
    }
    catch (error) {
        (0, prompts_1.outro)(chalk_1.default.red(`❌ Failed to fetch agents: ${error.message}`));
        process.exit(1);
    }
}
