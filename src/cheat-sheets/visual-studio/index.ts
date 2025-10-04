import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { ComputerDesktopIcon } from '@heroicons/react/24/outline'

export const visualStudioCheatSheet: CheatSheetDefinition = {
  id: 'visual-studio',
  title: 'Visual Studio',
  description: 'Essential shortcuts, debugging techniques, and productivity tips for Visual Studio IDE',
  category: 'IDEs',
  tags: ['visual-studio', 'ide', 'debugging', 'c-sharp', 'dotnet', 'productivity'],
  lastUpdated: '2025-10-04',
  icon: createElement(ComputerDesktopIcon),
  sections: [
    {
      title: 'Essential Navigation',
      items: [
        {
          title: 'Solution Explorer',
          shortcut: 'Ctrl+Alt+L',
          description: 'Show/hide solution explorer',
          os: 'all'
        },
        {
          title: 'Go to All',
          shortcut: 'Ctrl+T',
          description: 'Search files, types, members, and symbols',
          os: 'all'
        },
        {
          title: 'Go to File',
          shortcut: 'Ctrl+1, Ctrl+F',
          description: 'Quickly open files by name',
          os: 'all'
        },
        {
          title: 'Go to Type',
          shortcut: 'Ctrl+1, Ctrl+T',
          description: 'Navigate to classes and interfaces',
          os: 'all'
        },
        {
          title: 'Go to Member',
          shortcut: 'Ctrl+1, Ctrl+M',
          description: 'Jump to methods and properties',
          os: 'all'
        },
        {
          title: 'Go to Line',
          shortcut: 'Ctrl+G',
          description: 'Jump to specific line number',
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
          description: 'Navigate to symbol definition',
          os: 'all'
        },
        {
          title: 'Peek Definition',
          shortcut: 'Alt+F12',
          description: 'View definition inline without navigating',
          os: 'all'
        },
        {
          title: 'Go to Declaration',
          shortcut: 'Ctrl+F12',
          description: 'Navigate to symbol declaration',
          os: 'all'
        },
        {
          title: 'Find All References',
          shortcut: 'Shift+F12',
          description: 'Show all references to symbol',
          os: 'all'
        },
        {
          title: 'Navigate Backward',
          shortcut: 'Ctrl+-',
          description: 'Go back in navigation history',
          os: 'all'
        },
        {
          title: 'Navigate Forward',
          shortcut: 'Ctrl+Shift+-',
          description: 'Go forward in navigation history',
          os: 'all'
        }
      ]
    },
    {
      title: 'Code Editing',
      items: [
        {
          title: 'IntelliSense',
          shortcut: 'Ctrl+Space',
          description: 'Trigger code completion',
          os: 'all'
        },
        {
          title: 'Parameter Info',
          shortcut: 'Ctrl+Shift+Space',
          description: 'Show method parameter information',
          os: 'all'
        },
        {
          title: 'Quick Info',
          shortcut: 'Ctrl+K, Ctrl+I',
          description: 'Show quick information tooltip',
          os: 'all'
        },
        {
          title: 'Duplicate Line',
          shortcut: 'Ctrl+E, Ctrl+V',
          description: 'Duplicate current line',
          os: 'all'
        },
        {
          title: 'Delete Line',
          shortcut: 'Ctrl+Shift+L',
          description: 'Delete current line',
          os: 'all'
        },
        {
          title: 'Comment/Uncomment',
          shortcut: 'Ctrl+K, Ctrl+C / Ctrl+K, Ctrl+U',
          description: 'Toggle line comments',
          os: 'all'
        },
        {
          title: 'Block Comment',
          shortcut: 'Ctrl+Shift+/',
          description: 'Toggle block comment',
          os: 'all'
        },
        {
          title: 'Format Document',
          shortcut: 'Ctrl+K, Ctrl+D',
          description: 'Format entire document',
          os: 'all'
        },
        {
          title: 'Format Selection',
          shortcut: 'Ctrl+K, Ctrl+F',
          description: 'Format selected code',
          os: 'all'
        }
      ]
    },
    {
      title: 'Debugging',
      items: [
        {
          title: 'Start Debugging',
          shortcut: 'F5',
          description: 'Start debugging session',
          os: 'all'
        },
        {
          title: 'Start Without Debugging',
          shortcut: 'Ctrl+F5',
          description: 'Run application without debugger',
          os: 'all'
        },
        {
          title: 'Stop Debugging',
          shortcut: 'Shift+F5',
          description: 'Stop debugging session',
          os: 'all'
        },
        {
          title: 'Restart Debugging',
          shortcut: 'Ctrl+Shift+F5',
          description: 'Restart debugging session',
          os: 'all'
        },
        {
          title: 'Toggle Breakpoint',
          shortcut: 'F9',
          description: 'Add/remove breakpoint on current line',
          os: 'all'
        },
        {
          title: 'Step Over',
          shortcut: 'F10',
          description: 'Execute next line (step over method calls)',
          os: 'all'
        },
        {
          title: 'Step Into',
          shortcut: 'F11',
          description: 'Step into method calls',
          os: 'all'
        },
        {
          title: 'Step Out',
          shortcut: 'Shift+F11',
          description: 'Step out of current method',
          os: 'all'
        },
        {
          title: 'Continue',
          shortcut: 'F5',
          description: 'Continue execution to next breakpoint',
          os: 'all'
        }
      ]
    },
    {
      title: 'Build & Run',
      items: [
        {
          title: 'Build Solution',
          shortcut: 'Ctrl+Shift+B',
          description: 'Build entire solution',
          os: 'all'
        },
        {
          title: 'Build Project',
          shortcut: 'Alt+B, Alt+B',
          description: 'Build current project',
          os: 'all'
        },
        {
          title: 'Rebuild Solution',
          shortcut: 'Alt+B, Alt+R',
          description: 'Clean and build solution',
          os: 'all'
        },
        {
          title: 'Clean Solution',
          shortcut: 'Alt+B, Alt+L',
          description: 'Clean build artifacts',
          os: 'all'
        },
        {
          title: 'Run Tests',
          shortcut: 'Ctrl+R, Ctrl+A',
          description: 'Run all tests in solution',
          os: 'all'
        }
      ]
    },
    {
      title: 'Window Management',
      items: [
        {
          title: 'Close Tab',
          shortcut: 'Ctrl+F4',
          description: 'Close current document tab',
          os: 'all'
        },
        {
          title: 'Close All Tabs',
          shortcut: 'Alt+W, Alt+L',
          description: 'Close all document tabs',
          os: 'all'
        },
        {
          title: 'Switch Between Tabs',
          shortcut: 'Ctrl+Tab',
          description: 'Navigate between open documents',
          os: 'all'
        },
        {
          title: 'Split Window Horizontally',
          shortcut: 'Alt+W, Alt+H',
          description: 'Split editor window horizontally',
          os: 'all'
        },
        {
          title: 'Split Window Vertically',
          shortcut: 'Alt+W, Alt+V',
          description: 'Split editor window vertically',
          os: 'all'
        },
        {
          title: 'Full Screen',
          shortcut: 'Shift+Alt+Enter',
          description: 'Toggle full screen mode',
          os: 'all'
        }
      ]
    },
    {
      title: 'Refactoring',
      items: [
        {
          title: 'Rename Symbol',
          shortcut: 'Ctrl+R, Ctrl+R',
          description: 'Rename symbol across solution',
          os: 'all'
        },
        {
          title: 'Extract Method',
          shortcut: 'Ctrl+R, Ctrl+M',
          description: 'Extract selection to new method',
          os: 'all'
        },
        {
          title: 'Encapsulate Field',
          shortcut: 'Ctrl+R, Ctrl+E',
          description: 'Generate property for field',
          os: 'all'
        },
        {
          title: 'Extract Interface',
          shortcut: 'Ctrl+R, Ctrl+I',
          description: 'Extract interface from class',
          os: 'all'
        },
        {
          title: 'Quick Actions',
          shortcut: 'Ctrl+.',
          description: 'Show quick actions and refactoring menu',
          os: 'all'
        }
      ]
    },
    {
      title: 'Essential Extensions',
      items: [
        {
          title: 'ReSharper',
          description: 'Enhanced code analysis, refactoring, and navigation',
          code: 'JetBrains ReSharper'
        },
        {
          title: 'Visual Studio IntelliCode',
          description: 'AI-assisted code completion',
          code: 'Microsoft.VisualStudio.IntelliCode'
        },
        {
          title: 'CodeMaid',
          description: 'Code cleanup and organization',
          code: 'SteveCadwallader.CodeMaid'
        },
        {
          title: 'Productivity Power Tools',
          description: 'Collection of productivity enhancements',
          code: 'VisualStudioProductTeam.ProductivityPowerPack2022'
        },
        {
          title: 'Web Essentials',
          description: 'Web development productivity tools',
          code: 'MadsKristensen.WebEssentials2022'
        },
        {
          title: 'GitLens',
          description: 'Enhanced Git capabilities',
          code: 'eamodio.gitlens'
        }
      ]
    },
    {
      title: 'Pro Tips',
      items: [
        {
          title: 'Code Snippets',
          description: 'Use built-in code snippets like "prop", "ctor", "for"',
          example: 'Type "prop" + Tab + Tab to generate property'
        },
        {
          title: 'Multiple Carets',
          description: 'Hold Alt and click to place multiple cursors',
          shortcut: 'Alt+Click'
        },
        {
          title: 'Bookmark Lines',
          description: 'Set bookmarks to quickly navigate between important lines',
          shortcut: 'Ctrl+K, Ctrl+K (toggle) | Ctrl+K, Ctrl+N (next)'
        },
        {
          title: 'Task List',
          description: 'Add TODO, HACK, NOTE comments to create task list items',
          example: '// TODO: Implement error handling'
        },
        {
          title: 'Live Unit Testing',
          description: 'Enable live unit testing for real-time test feedback',
          example: 'Test > Live Unit Testing > Start'
        },
        {
          title: 'Code Lens',
          description: 'Shows references and test status above methods',
          example: 'Tools > Options > Text Editor > All Languages > CodeLens'
        }
      ]
    }
  ]
}