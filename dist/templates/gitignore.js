"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitignore = gitignore;
function gitignore() {
    return `# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/

# Production
dist/
build/

# Environment
.env
.env.local
.env.production

# Vercel
.vercel

# OS
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# TypeScript
*.tsbuildinfo
`;
}
