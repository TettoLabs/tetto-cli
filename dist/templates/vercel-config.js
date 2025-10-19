"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vercelConfig = vercelConfig;
function vercelConfig() {
    return JSON.stringify({
        buildCommand: 'npm run build',
        devCommand: 'npm run dev',
        installCommand: 'npm install',
        framework: 'nextjs',
        regions: ['iad1']
    }, null, 2);
}
