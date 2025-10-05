import type { CheatSheetDefinition } from '@/types'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { createElement } from 'react'

export const vscodeCheatSheet: CheatSheetDefinition = {
  id: 'vscode',
  title: 'Visual Studio Code',
  description: 'Essential shortcuts, extensions, and tips for Visual Studio Code',
  category: 'Editors',
  tags: ['vscode', 'editor', 'shortcuts', 'extensions', 'productivity'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketIcon),
  sections: [
    {
      title: 'Essential Shortcuts',
      items: [
        {
          title: 'Command Palette',
          shortcut: 'Ctrl+Shift+P / Cmd+Shift+P',
          description: 'Access all commands',
          os: 'all'
        },
        {
          title: 'Quick File Open',
          shortcut: 'Ctrl+P / Cmd+P',
          description: 'Quickly open files by name',
          os: 'all'
        },
        {
          title: 'Go to Symbol',
          shortcut: 'Ctrl+Shift+O / Cmd+Shift+O',
          description: 'Navigate to functions, classes, variables',
          os: 'all'
        },
        {
          title: 'Go to Line',
          shortcut: 'Ctrl+G / Cmd+G',
          description: 'Jump to specific line number',
          os: 'all'
        },
        {
          title: 'Find and Replace',
          shortcut: 'Ctrl+F / Cmd+F',
          description: 'Find text in current file',
          os: 'all'
        },
        {
          title: 'Global Find',
          shortcut: 'Ctrl+Shift+F / Cmd+Shift+F',
          description: 'Search across all files',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Navigation',
      items: [
        {
          title: 'Go to Definition',
          shortcut: 'F12',
          description: 'Jump to where symbol is defined',
          os: 'all'
        },
        {
          title: 'Peek Definition',
          shortcut: 'Alt+F12 / Opt+F12',
          description: 'View definition without leaving current file',
          os: 'all'
        },
        {
          title: 'Go to References',
          shortcut: 'Shift+F12',
          description: 'Find all references to symbol',
          os: 'all'
        },
        {
          title: 'Back/Forward',
          shortcut: 'Alt+← / Alt+→',
          description: 'Navigate through cursor history',
          os: 'all'
        },
        {
          title: 'Breadcrumb Navigation',
          shortcut: 'Ctrl+Shift+. / Cmd+Shift+.',
          description: 'Navigate file structure breadcrumbs',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Editing',
      items: [
        {
          title: 'Multi-cursor Selection',
          shortcut: 'Alt+Click / Opt+Click',
          description: 'Add cursor at clicked position',
          os: 'all'
        },
        {
          title: 'Select All Occurrences',
          shortcut: 'Ctrl+Shift+L / Cmd+Shift+L',
          description: 'Select all instances of current selection',
          os: 'all'
        },
        {
          title: 'Add Selection to Next Find Match',
          shortcut: 'Ctrl+D / Cmd+D',
          description: 'Multi-select next matching text',
          os: 'all'
        },
        {
          title: 'Line Actions',
          shortcut: 'Ctrl+Shift+K / Cmd+Shift+K',
          description: 'Delete current line',
          os: 'all'
        },
        {
          title: 'Copy Line Up/Down',
          shortcut: 'Shift+Alt+↑/↓',
          description: 'Duplicate line above/below',
          os: 'all'
        },
        {
          title: 'Move Line Up/Down',
          shortcut: 'Alt+↑/↓',
          description: 'Move current line up/down',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Formatting',
      items: [
        {
          title: 'Format Document',
          shortcut: 'Shift+Alt+F / Shift+Opt+F',
          description: 'Format entire file',
          os: 'all'
        },
        {
          title: 'Format Selection',
          shortcut: 'Ctrl+K Ctrl+F / Cmd+K Cmd+F',
          description: 'Format selected code',
          os: 'all'
        },
        {
          title: 'Toggle Comment',
          shortcut: 'Ctrl+/ / Cmd+/',
          description: 'Comment/uncomment line or selection',
          os: 'all'
        },
        {
          title: 'Block Comment',
          shortcut: 'Shift+Alt+A / Shift+Opt+A',
          description: 'Toggle block comment',
          os: 'all'
        }
      ]
    },
    {
      title: 'Window Management',
      items: [
        {
          title: 'Split Editor',
          shortcut: 'Ctrl+\\ / Cmd+\\\\',
          description: 'Split editor into multiple panes',
          os: 'all'
        },
        {
          title: 'Focus Editor Groups',
          shortcut: 'Ctrl+1/2/3 / Cmd+1/2/3',
          description: 'Switch between editor groups',
          os: 'all'
        },
        {
          title: 'Toggle Sidebar',
          shortcut: 'Ctrl+B / Cmd+B',
          description: 'Show/hide file explorer',
          os: 'all'
        },
        {
          title: 'Toggle Terminal',
          shortcut: 'Ctrl+` / Cmd+`',
          description: 'Show/hide integrated terminal',
          os: 'all'
        },
        {
          title: 'Zen Mode',
          shortcut: 'Ctrl+K Z / Cmd+K Z',
          description: 'Distraction-free mode',
          os: 'all'
        }
      ]
    },
    {
      title: 'Must-Have Extensions',
      items: [
        {
          title: 'Prettier',
          description: 'Code formatter for consistent styling',
          code: 'esbenp.prettier-vscode'
        },
        {
          title: 'ESLint',
          description: 'JavaScript/TypeScript linting',
          code: 'dbaeumer.vscode-eslint'
        },
        {
          title: 'GitLens',
          description: 'Enhanced Git capabilities',
          code: 'eamodio.gitlens'
        },
        {
          title: 'Auto Rename Tag',
          description: 'Automatically rename paired HTML/XML tags',
          code: 'formulahendry.auto-rename-tag'
        },
        {
          title: 'Bracket Pair Colorizer 2',
          description: 'Colorize matching brackets (now built-in)',
          code: 'coenraads.bracket-pair-colorizer-2'
        },
        {
          title: 'Live Server',
          description: 'Local development server with live reload',
          code: 'ritwickdey.liveserver'
        },
        {
          title: 'Path Intellisense',
          description: 'Autocomplete filenames',
          code: 'christian-kohler.path-intellisense'
        },
        {
          title: 'Thunder Client',
          description: 'REST API client like Postman',
          code: 'rangav.vscode-thunder-client'
        }
      ]
    },
    {
      title: 'Debugging',
      items: [
        {
          title: 'Toggle Breakpoint',
          shortcut: 'F9',
          description: 'Add/remove breakpoint on current line',
          os: 'all'
        },
        {
          title: 'Start Debugging',
          shortcut: 'F5',
          description: 'Start debugging session',
          os: 'all'
        },
        {
          title: 'Step Over',
          shortcut: 'F10',
          description: 'Execute next line (step over functions)',
          os: 'all'
        },
        {
          title: 'Step Into',
          shortcut: 'F11',
          description: 'Step into function calls',
          os: 'all'
        },
        {
          title: 'Step Out',
          shortcut: 'Shift+F11',
          description: 'Step out of current function',
          os: 'all'
        }
      ]
    },
    {
      title: 'Pro Tips',
      items: [
        {
          title: 'Settings Sync',
          description: 'Enable Settings Sync to sync extensions, settings, and keybindings across devices',
          example: 'Sign in with Microsoft/GitHub account in Settings Sync'
        },
        {
          title: 'Custom Snippets',
          description: 'Create code snippets for frequently used patterns',
          example: 'File > Preferences > Configure User Snippets'
        },
        {
          title: 'Workspace Settings',
          description: 'Create .vscode/settings.json for project-specific configuration',
          code: '{\n  "editor.tabSize": 2,\n  "files.autoSave": "onFocusChange"\n}'
        },
        {
          title: 'Tasks Configuration',
          description: 'Automate build tasks with .vscode/tasks.json',
          example: 'Terminal > Configure Tasks > Create from template'
        },
        {
          title: 'Emmet Abbreviations',
          description: 'Use Emmet for fast HTML/CSS writing',
          example: 'div.container>ul.list>li*3{Item $} + Tab'
        }
      ]
    }
  ]
}