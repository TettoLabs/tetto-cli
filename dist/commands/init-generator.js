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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAgent = generateAgent;
const fs_1 = require("fs");
const path_1 = require("path");
const logger_1 = require("../utils/logger");
const files_1 = require("../utils/files");
const templates = __importStar(require("../templates"));
async function generateAgent(config) {
    const projectPath = (0, files_1.getProjectPath)(config.agentName);
    logger_1.logger.info(`Creating agent: ${config.agentName}`);
    console.log();
    try {
        // Step 1: Create project directory
        logger_1.logger.step('Creating project directory...');
        (0, fs_1.mkdirSync)(projectPath, { recursive: true });
        // Step 2: Create subdirectories
        logger_1.logger.step('Creating directory structure...');
        (0, fs_1.mkdirSync)((0, path_1.join)(projectPath, 'app/api', config.agentName), { recursive: true });
        (0, fs_1.mkdirSync)((0, path_1.join)(projectPath, 'test'), { recursive: true });
        // Step 3: Generate files
        const files = [
            {
                path: 'package.json',
                content: templates.packageJson(config),
                description: 'package.json'
            },
            {
                path: `app/api/${config.agentName}/route.ts`,
                content: config.agentType === 'coordinator'
                    ? templates.coordinatorRouteFile(config)
                    : templates.routeFile(config),
                description: 'agent endpoint'
            },
            {
                path: 'tetto.config.json',
                content: templates.tettoConfig(config),
                description: 'tetto config'
            },
            {
                path: '.env.example',
                content: templates.envExample(config),
                description: 'environment template'
            },
            {
                path: 'README.md',
                content: templates.readme(config),
                description: 'README'
            },
            {
                path: 'tsconfig.json',
                content: templates.tsConfig(),
                description: 'TypeScript config'
            },
            {
                path: '.gitignore',
                content: templates.gitignore(),
                description: '.gitignore'
            },
            {
                path: 'vercel.json',
                content: templates.vercelConfig(),
                description: 'Vercel config'
            }
        ];
        for (const file of files) {
            logger_1.logger.step(`Creating ${file.description}...`);
            (0, fs_1.writeFileSync)((0, path_1.join)(projectPath, file.path), file.content, 'utf-8');
        }
        console.log();
        logger_1.logger.success(config.agentName);
        logger_1.logger.nextSteps(config.agentName);
    }
    catch (error) {
        logger_1.logger.error(error);
        throw error;
    }
}
