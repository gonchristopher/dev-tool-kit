import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { BoltIcon } from '@heroicons/react/24/outline'

export const intellijCheatSheet: CheatSheetDefinition = {
  id: 'intellij',
  title: 'IntelliJ IDEA',
  description: 'Essential shortcuts, refactoring tools, and productivity features for IntelliJ IDEA',
  category: 'IDEs',
  tags: ['intellij', 'jetbrains', 'java', 'ide', 'refactoring', 'debugging'],
  lastUpdated: '2025-10-04',
  icon: createElement(BoltIcon),
  sections: [
    {
      title: 'Navigation',
      items: [
        {
          title: 'Search Everywhere',
          shortcut: 'Double Shift',
          description: 'Search for anything in your project',
          os: 'all'
        },
        {
          title: 'Go to Class',
          shortcut: 'Ctrl+N / Cmd+O',
          description: 'Navigate to any class',
          os: 'all'
        },
        {
          title: 'Go to File',
          shortcut: 'Ctrl+Shift+N / Cmd+Shift+O',
          description: 'Navigate to any file',
          os: 'all'
        },
        {
          title: 'Go to Symbol',
          shortcut: 'Ctrl+Alt+Shift+N / Cmd+Opt+O',
          description: 'Navigate to any symbol (method, field, etc.)',
          os: 'all'
        },
        {
          title: 'Recent Files',
          shortcut: 'Ctrl+E / Cmd+E',
          description: 'Show recently opened files',
          os: 'all'
        },
        {
          title: 'Find Action',
          shortcut: 'Ctrl+Shift+A / Cmd+Shift+A',
          description: 'Find any action or setting',
          os: 'all'
        },
        {
          title: 'Go to Line',
          shortcut: 'Ctrl+G / Cmd+L',
          description: 'Jump to specific line number',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Navigation',
      items: [
        {
          title: 'Go to Declaration',
          shortcut: 'Ctrl+B / Cmd+B',
          description: 'Jump to symbol declaration',
          os: 'all'
        },
        {
          title: 'Go to Implementation',
          shortcut: 'Ctrl+Alt+B / Cmd+Opt+B',
          description: 'Jump to implementation',
          os: 'all'
        },
        {
          title: 'Go to Super Method',
          shortcut: 'Ctrl+U / Cmd+U',
          description: 'Navigate to parent method',
          os: 'all'
        },
        {
          title: 'Find Usages',
          shortcut: 'Alt+F7 / Opt+F7',
          description: 'Find all usages of symbol',
          os: 'all'
        },
        {
          title: 'Navigate Back',
          shortcut: 'Ctrl+Alt+← / Cmd+Opt+←',
          description: 'Go back in navigation history',
          os: 'all'
        },
        {
          title: 'Navigate Forward',
          shortcut: 'Ctrl+Alt+→ / Cmd+Opt+→',
          description: 'Go forward in navigation history',
          os: 'all'
        },
        {
          title: 'File Structure',
          shortcut: 'Ctrl+F12 / Cmd+F12',
          description: 'Show file structure popup',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Editing',
      items: [
        {
          title: 'Basic Code Completion',
          shortcut: 'Ctrl+Space / Ctrl+Space',
          description: 'Trigger code completion',
          os: 'all'
        },
        {
          title: 'Smart Code Completion',
          shortcut: 'Ctrl+Shift+Space / Ctrl+Shift+Space',
          description: 'Context-aware code completion',
          os: 'all'
        },
        {
          title: 'Complete Statement',
          shortcut: 'Ctrl+Shift+Enter / Cmd+Shift+Enter',
          description: 'Complete current statement',
          os: 'all'
        },
        {
          title: 'Duplicate Line',
          shortcut: 'Ctrl+D / Cmd+D',
          description: 'Duplicate current line',
          os: 'all'
        },
        {
          title: 'Delete Line',
          shortcut: 'Ctrl+Y / Cmd+Backspace',
          description: 'Delete current line',
          os: 'all'
        },
        {
          title: 'Move Line Up/Down',
          shortcut: 'Shift+Alt+↑/↓ / Shift+Opt+↑/↓',
          description: 'Move line up or down',
          os: 'all'
        },
        {
          title: 'Join Lines',
          shortcut: 'Ctrl+Shift+J / Ctrl+Shift+J',
          description: 'Join selected lines',
          os: 'all'
        },
        {
          title: 'Toggle Case',
          shortcut: 'Ctrl+Shift+U / Cmd+Shift+U',
          description: 'Toggle between upper/lower case',
          os: 'all'
        }
      ]
    },
    {
      title: 'Refactoring',
      items: [
        {
          title: 'Rename',
          shortcut: 'Shift+F6',
          description: 'Rename symbol across project',
          os: 'all'
        },
        {
          title: 'Extract Variable',
          shortcut: 'Ctrl+Alt+V / Cmd+Opt+V',
          description: 'Extract expression to variable',
          os: 'all'
        },
        {
          title: 'Extract Field',
          shortcut: 'Ctrl+Alt+F / Cmd+Opt+F',
          description: 'Extract expression to field',
          os: 'all'
        },
        {
          title: 'Extract Method',
          shortcut: 'Ctrl+Alt+M / Cmd+Opt+M',
          description: 'Extract selected code to method',
          os: 'all'
        },
        {
          title: 'Extract Constant',
          shortcut: 'Ctrl+Alt+C / Cmd+Opt+C',
          description: 'Extract value to constant',
          os: 'all'
        },
        {
          title: 'Inline Variable',
          shortcut: 'Ctrl+Alt+N / Cmd+Opt+N',
          description: 'Inline variable usage',
          os: 'all'
        },
        {
          title: 'Change Signature',
          shortcut: 'Ctrl+F6 / Cmd+F6',
          description: 'Change method signature',
          os: 'all'
        },
        {
          title: 'Move Class',
          shortcut: 'F6',
          description: 'Move class to another package',
          os: 'all'
        }
      ]
    },
    {
      title: 'Debugging',
      items: [
        {
          title: 'Toggle Breakpoint',
          shortcut: 'Ctrl+F8 / Cmd+F8',
          description: 'Add/remove breakpoint',
          os: 'all'
        },
        {
          title: 'Step Over',
          shortcut: 'F8',
          description: 'Execute next line',
          os: 'all'
        },
        {
          title: 'Step Into',
          shortcut: 'F7',
          description: 'Step into method calls',
          os: 'all'
        },
        {
          title: 'Step Out',
          shortcut: 'Shift+F8',
          description: 'Step out of current method',
          os: 'all'
        },
        {
          title: 'Resume Program',
          shortcut: 'F9',
          description: 'Continue execution',
          os: 'all'
        },
        {
          title: 'Evaluate Expression',
          shortcut: 'Alt+F8 / Opt+F8',
          description: 'Evaluate expression in debugger',
          os: 'all'
        },
        {
          title: 'Run to Cursor',
          shortcut: 'Alt+F9 / Opt+F9',
          description: 'Run until cursor position',
          os: 'all'
        }
      ]
    },
    {
      title: 'Build & Run',
      items: [
        {
          title: 'Build Project',
          shortcut: 'Ctrl+F9 / Cmd+F9',
          description: 'Compile project',
          os: 'all'
        },
        {
          title: 'Run',
          shortcut: 'Shift+F10 / Ctrl+R',
          description: 'Run current configuration',
          os: 'all'
        },
        {
          title: 'Debug',
          shortcut: 'Shift+F9 / Ctrl+D',
          description: 'Debug current configuration',
          os: 'all'
        },
        {
          title: 'Run Anything',
          shortcut: 'Ctrl+Ctrl / Ctrl+Ctrl',
          description: 'Run anything dialog',
          os: 'all'
        },
        {
          title: 'Stop',
          shortcut: 'Ctrl+F2 / Cmd+F2',
          description: 'Stop running application',
          os: 'all'
        }
      ]
    },
    {
      title: 'Search & Replace',
      items: [
        {
          title: 'Find',
          shortcut: 'Ctrl+F / Cmd+F',
          description: 'Find in current file',
          os: 'all'
        },
        {
          title: 'Find and Replace',
          shortcut: 'Ctrl+R / Cmd+R',
          description: 'Find and replace in current file',
          os: 'all'
        },
        {
          title: 'Find in Path',
          shortcut: 'Ctrl+Shift+F / Cmd+Shift+F',
          description: 'Find across all files',
          os: 'all'
        },
        {
          title: 'Replace in Path',
          shortcut: 'Ctrl+Shift+R / Cmd+Shift+R',
          description: 'Replace across all files',
          os: 'all'
        },
        {
          title: 'Find Next',
          shortcut: 'F3 / Cmd+G',
          description: 'Find next occurrence',
          os: 'all'
        },
        {
          title: 'Find Previous',
          shortcut: 'Shift+F3 / Cmd+Shift+G',
          description: 'Find previous occurrence',
          os: 'all'
        }
      ]
    },
    {
      title: 'Window Management',
      items: [
        {
          title: 'Hide All Tool Windows',
          shortcut: 'Ctrl+Shift+F12 / Cmd+Shift+F12',
          description: 'Hide all tool windows',
          os: 'all'
        },
        {
          title: 'Project Tool Window',
          shortcut: 'Alt+1 / Cmd+1',
          description: 'Show/hide project window',
          os: 'all'
        },
        {
          title: 'Terminal',
          shortcut: 'Alt+F12 / Opt+F12',
          description: 'Show/hide terminal',
          os: 'all'
        },
        {
          title: 'Split Vertically',
          shortcut: 'Ctrl+Shift+\\ / Cmd+Shift+\\',
          description: 'Split editor vertically',
          os: 'all'
        },
        {
          title: 'Split Horizontally',
          shortcut: 'Ctrl+Shift+- / Cmd+Shift+-',
          description: 'Split editor horizontally',
          os: 'all'
        },
        {
          title: 'Close Tab',
          shortcut: 'Ctrl+F4 / Cmd+W',
          description: 'Close current editor tab',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Generation',
      items: [
        {
          title: 'Generate Code',
          shortcut: 'Alt+Insert / Cmd+N',
          description: 'Generate constructors, getters, setters',
          os: 'all'
        },
        {
          title: 'Override Methods',
          shortcut: 'Ctrl+O / Ctrl+O',
          description: 'Override parent methods',
          os: 'all'
        },
        {
          title: 'Implement Methods',
          shortcut: 'Ctrl+I / Ctrl+I',
          description: 'Implement interface methods',
          os: 'all'
        },
        {
          title: 'Surround With',
          shortcut: 'Ctrl+Alt+T / Cmd+Opt+T',
          description: 'Surround code with template',
          os: 'all'
        },
        {
          title: 'Comment/Uncomment Line',
          shortcut: 'Ctrl+/ / Cmd+/',
          description: 'Toggle line comment',
          os: 'all'
        },
        {
          title: 'Comment/Uncomment Block',
          shortcut: 'Ctrl+Shift+/ / Cmd+Shift+/',
          description: 'Toggle block comment',
          os: 'all'
        }
      ]
    },
    {
      title: 'Essential Plugins',
      items: [
        {
          title: 'Lombok',
          description: 'Automatic code generation for Java',
          code: 'Lombok Plugin'
        },
        {
          title: 'SonarLint',
          description: 'Code quality and security analysis',
          code: 'SonarLint'
        },
        {
          title: 'GitToolBox',
          description: 'Enhanced Git integration',
          code: 'GitToolBox'
        },
        {
          title: 'Rainbow Brackets',
          description: 'Colorize matching brackets',
          code: 'Rainbow Brackets'
        },
        {
          title: 'Key Promoter X',
          description: 'Learn keyboard shortcuts',
          code: 'Key Promoter X'
        },
        {
          title: 'String Manipulation',
          description: 'Advanced string operations',
          code: 'String Manipulation'
        },
        {
          title: 'Database Navigator',
          description: 'Database development tool',
          code: 'Database Navigator'
        }
      ]
    },
    {
      title: 'Pro Tips',
      items: [
        {
          title: 'Live Templates',
          description: 'Use predefined code templates like "psvm", "sout", "iter"',
          example: 'Type "psvm" + Tab for public static void main method'
        },
        {
          title: 'Postfix Completion',
          description: 'Transform expressions using postfix operators',
          example: 'myList.for + Tab → for(Type item : myList)'
        },
        {
          title: 'Multiple Cursors',
          description: 'Select multiple occurrences and edit simultaneously',
          shortcut: 'Alt+J / Ctrl+G (add selection), Alt+Shift+J (remove)'
        },
        {
          title: 'Scratch Files',
          description: 'Create temporary files for testing code snippets',
          shortcut: 'Ctrl+Alt+Shift+Insert / Cmd+Shift+N'
        },
        {
          title: 'Structural Search',
          description: 'Search for code patterns and structures',
          shortcut: 'Ctrl+Shift+S / Cmd+Shift+S'
        },
        {
          title: 'Compare with Clipboard',
          description: 'Compare current file with clipboard content',
          example: 'Right-click in editor → Compare with Clipboard'
        }
      ]
    }
  ]
}