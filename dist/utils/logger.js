"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.logger = {
    welcome() {
        console.log();
        console.log(chalk_1.default.bold.cyan('🎨 Create Tetto Agent'));
        console.log(chalk_1.default.gray('Build AI agents that earn revenue on Tetto marketplace'));
        console.log();
    },
    info(message) {
        console.log(chalk_1.default.blue('ℹ'), message);
    },
    step(message) {
        console.log(chalk_1.default.gray('  ✓'), message);
    },
    success(agentName) {
        console.log();
        console.log(chalk_1.default.green('✅ Agent created successfully!'));
        console.log();
        console.log(chalk_1.default.bold('Project:'), agentName);
    },
    error(error) {
        console.log();
        console.log(chalk_1.default.red('✗ Error:'), error instanceof Error ? error.message : String(error));
        console.log();
    },
    nextSteps(agentName) {
        console.log(chalk_1.default.bold('Next steps:'));
        console.log();
        console.log(chalk_1.default.gray('  1.'), `cd ${agentName}`);
        console.log(chalk_1.default.gray('  2.'), 'npm install');
        console.log(chalk_1.default.gray('  3.'), 'npm run dev');
        console.log();
        console.log(chalk_1.default.bold('After deploying:'));
        console.log(chalk_1.default.gray('  •'), chalk_1.default.cyan('https://tetto.io/dashboard/profile'));
        console.log(chalk_1.default.gray('     Complete your profile & create studio page'));
        console.log();
        console.log(chalk_1.default.gray('Learn more:'), chalk_1.default.cyan('https://tetto.io/docs/building-agents'));
        console.log();
    }
};
