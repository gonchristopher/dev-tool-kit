import type { CheatSheetDefinition } from '@/types'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import { createElement } from 'react'

export const nodejsCheatSheet: CheatSheetDefinition = {
  id: 'nodejs',
  title: 'Node.js & NPM',
  description: 'Essential Node.js concepts, NPM commands, and package management tips',
  category: 'Development',
  tags: ['nodejs', 'npm', 'javascript', 'backend', 'package-manager', 'yarn'],
  lastUpdated: '2025-10-04',
  icon: createElement(CommandLineIcon),
  sections: [
    {
      title: 'NPM Basics',
      items: [
        {
          title: 'Check NPM Version',
          code: 'npm --version',
          description: 'Display NPM version'
        },
        {
          title: 'Check Node Version',
          code: 'node --version',
          description: 'Display Node.js version'
        },
        {
          title: 'Initialize Project',
          code: 'npm init',
          description: 'Create new package.json file',
          example: 'npm init -y (skip questions with default values)'
        },
        {
          title: 'Install Package',
          code: 'npm install <package>',
          description: 'Install package locally',
          example: 'npm install express'
        },
        {
          title: 'Install Globally',
          code: 'npm install -g <package>',
          description: 'Install package globally',
          example: 'npm install -g nodemon'
        },
        {
          title: 'Install Dev Dependency',
          code: 'npm install --save-dev <package>',
          description: 'Install as development dependency',
          example: 'npm install --save-dev jest'
        },
        {
          title: 'Install All Dependencies',
          code: 'npm install',
          description: 'Install all packages from package.json'
        }
      ]
    },
    {
      title: 'Package Management',
      items: [
        {
          title: 'List Installed Packages',
          code: 'npm list',
          description: 'Show installed packages',
          example: 'npm list -g (global packages), npm list --depth=0 (top level only)'
        },
        {
          title: 'Update Package',
          code: 'npm update <package>',
          description: 'Update specific package to latest version'
        },
        {
          title: 'Update All Packages',
          code: 'npm update',
          description: 'Update all packages to latest versions'
        },
        {
          title: 'Uninstall Package',
          code: 'npm uninstall <package>',
          description: 'Remove package from project',
          example: 'npm uninstall --save <package> (update package.json)'
        },
        {
          title: 'Check Outdated Packages',
          code: 'npm outdated',
          description: 'Show packages that have newer versions available'
        },
        {
          title: 'Package Information',
          code: 'npm info <package>',
          description: 'Display detailed package information',
          example: 'npm info express'
        },
        {
          title: 'Search Packages',
          code: 'npm search <keyword>',
          description: 'Search for packages in NPM registry'
        }
      ]
    },
    {
      title: 'NPM Scripts',
      items: [
        {
          title: 'Run Script',
          code: 'npm run <script-name>',
          description: 'Execute script defined in package.json',
          example: 'npm run build, npm run test'
        },
        {
          title: 'Start Application',
          code: 'npm start',
          description: 'Run the start script (shorthand for npm run start)'
        },
        {
          title: 'Run Tests',
          code: 'npm test',
          description: 'Run the test script (shorthand for npm run test)'
        },
        {
          title: 'List Available Scripts',
          code: 'npm run',
          description: 'Show all available scripts in package.json'
        },
        {
          title: 'Run with Arguments',
          code: 'npm run <script> -- --arg=value',
          description: 'Pass arguments to npm script',
          example: 'npm run build -- --production'
        },
        {
          title: 'Pre/Post Scripts',
          description: 'Scripts that run before/after main script',
          example: 'prestart, postinstall, prebuild, etc.'
        }
      ]
    },
    {
      title: 'Package.json Configuration',
      items: [
        {
          title: 'Basic Structure',
          code: '{\n  "name": "my-app",\n  "version": "1.0.0",\n  "description": "",\n  "main": "index.js"\n}',
          description: 'Essential package.json fields'
        },
        {
          title: 'Scripts Section',
          code: '{\n  "scripts": {\n    "start": "node index.js",\n    "dev": "nodemon index.js",\n    "build": "webpack --mode production"\n  }\n}',
          description: 'Define custom scripts'
        },
        {
          title: 'Dependencies vs DevDependencies',
          code: '{\n  "dependencies": { "express": "^4.18.0" },\n  "devDependencies": { "jest": "^28.0.0" }\n}',
          description: 'Runtime vs development dependencies'
        },
        {
          title: 'Engines Field',
          code: '{\n  "engines": {\n    "node": ">=16.0.0",\n    "npm": ">=8.0.0"\n  }\n}',
          description: 'Specify required Node.js and NPM versions'
        },
        {
          title: 'Keywords & Repository',
          code: '{\n  "keywords": ["api", "server"],\n  "repository": "github:user/repo",\n  "license": "MIT"\n}',
          description: 'Metadata for package discovery'
        },
        {
          title: 'Entry Points',
          code: '{\n  "main": "dist/index.js",\n  "bin": { "mycli": "./bin/cli.js" },\n  "exports": { ".": "./index.js" }\n}',
          description: 'Define package entry points'
        }
      ]
    },
    {
      title: 'Version Management',
      items: [
        {
          title: 'Semantic Versioning',
          description: 'MAJOR.MINOR.PATCH (1.2.3)',
          example: 'MAJOR: breaking changes, MINOR: new features, PATCH: bug fixes'
        },
        {
          title: 'Version Ranges',
          code: '^1.2.3 (compatible), ~1.2.3 (close), >=1.2.3 (at least)',
          description: 'Specify acceptable version ranges'
        },
        {
          title: 'Update Version',
          code: 'npm version <patch|minor|major>',
          description: 'Increment version number',
          example: 'npm version patch (1.0.0 → 1.0.1)'
        },
        {
          title: 'Package Lock',
          description: 'package-lock.json ensures exact dependency versions',
          example: 'Commit package-lock.json for consistent installs'
        },
        {
          title: 'Exact Versions',
          code: 'npm install --save-exact <package>',
          description: 'Install exact version without range'
        }
      ]
    },
    {
      title: 'NPX Commands',
      items: [
        {
          title: 'Run Package Binary',
          code: 'npx <package>',
          description: 'Execute package without installing globally',
          example: 'npx create-react-app my-app'
        },
        {
          title: 'Run Local Binary',
          code: 'npx <local-package>',
          description: 'Run locally installed package binary',
          example: 'npx jest --watch'
        },
        {
          title: 'Run Specific Version',
          code: 'npx <package>@<version>',
          description: 'Execute specific package version',
          example: 'npx create-react-app@latest my-app'
        },
        {
          title: 'Force Download',
          code: 'npx --ignore-existing <package>',
          description: 'Download fresh copy ignoring local version'
        }
      ]
    },
    {
      title: 'Node.js Core Concepts',
      items: [
        {
          title: 'Require Modules',
          code: 'const fs = require(\'fs\');',
          description: 'Import built-in or installed modules (CommonJS)'
        },
        {
          title: 'ES Modules',
          code: 'import fs from \'fs\';',
          description: 'Modern module syntax (requires "type": "module" in package.json)'
        },
        {
          title: 'Export Module',
          code: 'module.exports = { function1, function2 };',
          description: 'Export functions/objects (CommonJS)'
        },
        {
          title: 'ES Module Export',
          code: 'export default myFunction;\nexport { helper1, helper2 };',
          description: 'Modern export syntax'
        },
        {
          title: 'Environment Variables',
          code: 'process.env.NODE_ENV',
          description: 'Access environment variables',
          example: 'Use dotenv package for .env file support'
        },
        {
          title: 'Command Line Arguments',
          code: 'process.argv',
          description: 'Access command line arguments',
          example: 'process.argv[2] is first user argument'
        },
        {
          title: 'File System Operations',
          code: 'fs.readFileSync(\'file.txt\', \'utf8\');',
          description: 'Read/write files synchronously or asynchronously'
        }
      ]
    },
    {
      title: 'Development Tools',
      items: [
        {
          title: 'Nodemon',
          code: 'npm install -g nodemon',
          description: 'Auto-restart Node.js app on file changes',
          example: 'nodemon index.js'
        },
        {
          title: 'PM2',
          code: 'npm install -g pm2',
          description: 'Production process manager',
          example: 'pm2 start app.js --name "my-app"'
        },
        {
          title: 'Node Inspector',
          code: 'node --inspect index.js',
          description: 'Debug Node.js apps with Chrome DevTools'
        },
        {
          title: 'NPM Audit',
          code: 'npm audit',
          description: 'Check for security vulnerabilities',
          example: 'npm audit fix (automatically fix issues)'
        },
        {
          title: 'NPM Doctor',
          code: 'npm doctor',
          description: 'Check NPM environment for common issues'
        },
        {
          title: 'Clean Cache',
          code: 'npm cache clean --force',
          description: 'Clear NPM cache (use when having install issues)'
        }
      ]
    },
    {
      title: 'Performance & Optimization',
      items: [
        {
          title: 'Production Install',
          code: 'npm install --production',
          description: 'Install only production dependencies'
        },
        {
          title: 'CI Install',
          code: 'npm ci',
          description: 'Fast, reliable install for CI/CD (uses package-lock.json)',
          example: 'Faster than npm install, ensures exact versions'
        },
        {
          title: 'Bundle Analysis',
          code: 'npm ls --depth=0',
          description: 'Analyze dependency tree and sizes'
        },
        {
          title: 'Check Bundle Size',
          description: 'Use bundlephobia.com or npm package size tools',
          example: 'Check package size impact before installing'
        },
        {
          title: 'Node.js Profiling',
          code: 'node --prof index.js',
          description: 'Generate performance profile',
          example: 'Use --prof-process to analyze profile'
        }
      ]
    },
    {
      title: 'Alternative Package Managers',
      items: [
        {
          title: 'Yarn Install',
          code: 'yarn install',
          description: 'Install dependencies with Yarn',
          example: 'Generally faster than NPM'
        },
        {
          title: 'Yarn Add Package',
          code: 'yarn add <package>',
          description: 'Add package with Yarn',
          example: 'yarn add --dev <package> for dev dependencies'
        },
        {
          title: 'pnpm (Fast Alternative)',
          code: 'pnpm install',
          description: 'Fast, disk space efficient package manager',
          example: 'Uses hard links to save disk space'
        },
        {
          title: 'Package Manager Comparison',
          description: 'NPM (default), Yarn (fast), pnpm (efficient)',
          example: 'Choose based on team preference and project needs'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          title: 'Clear Node Modules',
          code: 'rm -rf node_modules && npm install',
          description: 'Fresh install of all dependencies'
        },
        {
          title: 'Check Global Packages',
          code: 'npm list -g --depth=0',
          description: 'See globally installed packages'
        },
        {
          title: 'Fix Permissions (macOS/Linux)',
          code: 'sudo chown -R $(whoami) ~/.npm',
          description: 'Fix NPM permission issues'
        },
        {
          title: 'Windows Path Issues',
          description: 'Use npm config set prefix to set global install path',
          example: 'Avoid spaces in path names'
        },
        {
          title: 'Registry Issues',
          code: 'npm config get registry',
          description: 'Check current NPM registry',
          example: 'npm config set registry https://registry.npmjs.org/'
        }
      ]
    }
  ]
}