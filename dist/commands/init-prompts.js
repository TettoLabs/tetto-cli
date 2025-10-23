"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCLI = runCLI;
const prompts_1 = __importDefault(require("prompts"));
const chalk_1 = __importDefault(require("chalk"));
const validation_1 = require("../utils/validation");
const files_1 = require("../utils/files");
async function runCLI() {
    const questions = [
        {
            type: 'text',
            name: 'agentName',
            message: 'Agent name (kebab-case):',
            initial: 'my-agent',
            validate: (value) => {
                const nameValidation = (0, validation_1.validateAgentName)(value);
                if (nameValidation !== true)
                    return nameValidation;
                if ((0, files_1.checkProjectExists)(value)) {
                    return `Directory "${value}" already exists`;
                }
                return true;
            }
        },
        {
            type: 'text',
            name: 'description',
            message: 'Description (optional):',
            initial: ''
        },
        {
            type: 'number',
            name: 'priceUSD',
            message: 'Price per call (USD):',
            initial: 0.01,
            min: 0.001,
            max: 100,
            validate: (value) => (0, validation_1.validatePrice)(value),
            format: (value) => value.toFixed(3)
        },
        {
            type: 'select',
            name: 'paymentToken',
            message: 'Payment token:',
            choices: [
                {
                    title: 'USDC (recommended - 99% of agents use this)',
                    value: 'USDC'
                },
                {
                    title: 'SOL',
                    value: 'SOL'
                }
            ],
            initial: 0
        },
        {
            type: 'select',
            name: 'agentType',
            message: 'Agent type:',
            choices: [
                {
                    title: 'simple (20s timeout) - Most agents',
                    value: 'simple',
                    description: 'For quick AI calls and basic processing'
                },
                {
                    title: 'complex (120s timeout) - Heavy processing',
                    value: 'complex',
                    description: 'For data analysis, API calls, etc.'
                },
                {
                    title: 'coordinator (180s timeout) - Multi-agent',
                    value: 'coordinator',
                    description: 'For calling other agents autonomously'
                }
            ],
            initial: 0
        },
        {
            type: 'confirm',
            name: 'includeExamples',
            message: 'Include example inputs?',
            initial: true
        }
    ];
    const answers = await (0, prompts_1.default)(questions, {
        onCancel: () => {
            console.log();
            console.log(chalk_1.default.yellow('Cancelled by user'));
            process.exit(0);
        }
    });
    return answers;
}
