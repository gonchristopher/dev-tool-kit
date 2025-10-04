import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'

export const notepadPlusCheatSheet: CheatSheetDefinition = {
  id: 'notepadplus',
  title: 'Notepad++',
  description: 'Essential Notepad++ shortcuts, plugins, and text editing features',
  category: 'Text Editors',
  tags: ['notepad++', 'text-editor', 'windows', 'plugins', 'regex', 'find-replace'],
  lastUpdated: '2025-10-04',
  icon: createElement(DocumentTextIcon),
  sections: [
    {
      title: 'Basic Navigation',
      items: [
        {
          title: 'New File',
          shortcut: 'Ctrl+N',
          description: 'Create new document',
          os: 'windows'
        },
        {
          title: 'Open File',
          shortcut: 'Ctrl+O',
          description: 'Open existing file',
          os: 'windows'
        },
        {
          title: 'Save File',
          shortcut: 'Ctrl+S',
          description: 'Save current document',
          os: 'windows'
        },
        {
          title: 'Save As',
          shortcut: 'Ctrl+Alt+S',
          description: 'Save with new name or location',
          os: 'windows'
        },
        {
          title: 'Close Tab',
          shortcut: 'Ctrl+W',
          description: 'Close current document tab',
          os: 'windows'
        },
        {
          title: 'Switch Between Tabs',
          shortcut: 'Ctrl+Tab / Ctrl+Shift+Tab',
          description: 'Navigate between open documents',
          os: 'windows'
        },
        {
          title: 'Go to Line',
          shortcut: 'Ctrl+G',
          description: 'Jump to specific line number',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Text Selection & Editing',
      items: [
        {
          title: 'Select All',
          shortcut: 'Ctrl+A',
          description: 'Select entire document',
          os: 'windows'
        },
        {
          title: 'Select Word',
          shortcut: 'Double-click',
          description: 'Select word under cursor',
          os: 'windows'
        },
        {
          title: 'Select Line',
          shortcut: 'Triple-click',
          description: 'Select entire line',
          os: 'windows'
        },
        {
          title: 'Duplicate Line',
          shortcut: 'Ctrl+D',
          description: 'Duplicate current line',
          os: 'windows'
        },
        {
          title: 'Delete Line',
          shortcut: 'Ctrl+L',
          description: 'Delete entire line',
          os: 'windows'
        },
        {
          title: 'Move Line Up/Down',
          shortcut: 'Ctrl+Shift+Up/Down',
          description: 'Move current line up or down',
          os: 'windows'
        },
        {
          title: 'Transpose Lines',
          shortcut: 'Ctrl+T',
          description: 'Swap current line with line above',
          os: 'windows'
        },
        {
          title: 'Join Lines',
          shortcut: 'Ctrl+J',
          description: 'Join current line with next line',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Search & Replace',
      items: [
        {
          title: 'Find',
          shortcut: 'Ctrl+F',
          description: 'Open find dialog',
          os: 'windows'
        },
        {
          title: 'Find Next',
          shortcut: 'F3',
          description: 'Find next occurrence',
          os: 'windows'
        },
        {
          title: 'Find Previous',
          shortcut: 'Shift+F3',
          description: 'Find previous occurrence',
          os: 'windows'
        },
        {
          title: 'Replace',
          shortcut: 'Ctrl+H',
          description: 'Open find and replace dialog',
          os: 'windows'
        },
        {
          title: 'Find in Files',
          shortcut: 'Ctrl+Shift+F',
          description: 'Search across multiple files',
          os: 'windows'
        },
        {
          title: 'Replace in Files',
          shortcut: 'Ctrl+Shift+H',
          description: 'Replace across multiple files',
          os: 'windows'
        },
        {
          title: 'Incremental Search',
          shortcut: 'Ctrl+Alt+I',
          description: 'Search as you type',
          os: 'windows'
        },
        {
          title: 'Mark All',
          shortcut: 'Alt+A (in find dialog)',
          description: 'Highlight all search results',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Text Transformation',
      items: [
        {
          title: 'Uppercase',
          shortcut: 'Ctrl+Shift+U',
          description: 'Convert selection to uppercase',
          os: 'windows'
        },
        {
          title: 'Lowercase',
          shortcut: 'Ctrl+U',
          description: 'Convert selection to lowercase',
          os: 'windows'
        },
        {
          title: 'Proper Case',
          description: 'Format > Convert Case To > Proper Case',
          example: 'Capitalize first letter of each word'
        },
        {
          title: 'Sentence Case',
          description: 'Format > Convert Case To > Sentence case',
          example: 'Capitalize first letter of sentences'
        },
        {
          title: 'Invert Case',
          description: 'Format > Convert Case To > inVERT cASE',
          example: 'Toggle case of each character'
        },
        {
          title: 'Remove Empty Lines',
          description: 'Edit > Line Operations > Remove Empty Lines',
          example: 'Delete all blank lines from document'
        },
        {
          title: 'Sort Lines',
          description: 'Edit > Line Operations > Sort Lines',
          example: 'Sort selected lines alphabetically'
        }
      ]
    },
    {
      title: 'Code Editing',
      items: [
        {
          title: 'Toggle Comment',
          shortcut: 'Ctrl+Q',
          description: 'Comment/uncomment lines',
          os: 'windows'
        },
        {
          title: 'Block Comment',
          shortcut: 'Ctrl+Shift+Q',
          description: 'Toggle block comment',
          os: 'windows'
        },
        {
          title: 'Auto-Completion',
          shortcut: 'Ctrl+Space',
          description: 'Trigger word completion',
          os: 'windows'
        },
        {
          title: 'Function Completion',
          shortcut: 'Ctrl+Alt+Space',
          description: 'Show function parameters',
          os: 'windows'
        },
        {
          title: 'Brace Matching',
          shortcut: 'Ctrl+B',
          description: 'Jump to matching brace/bracket',
          os: 'windows'
        },
        {
          title: 'Fold All',
          shortcut: 'Alt+0',
          description: 'Collapse all code blocks',
          os: 'windows'
        },
        {
          title: 'Unfold All',
          shortcut: 'Alt+Shift+0',
          description: 'Expand all code blocks',
          os: 'windows'
        },
        {
          title: 'Toggle Fold',
          shortcut: 'Ctrl+Alt+F',
          description: 'Toggle current fold',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Multi-Editing',
      items: [
        {
          title: 'Column Mode',
          shortcut: 'Alt+C',
          description: 'Toggle column selection mode',
          os: 'windows'
        },
        {
          title: 'Column Selection',
          shortcut: 'Alt+Shift+Arrow keys',
          description: 'Select rectangular text block',
          os: 'windows'
        },
        {
          title: 'Multi-Selection',
          shortcut: 'Ctrl+Mouse clicks',
          description: 'Select multiple text locations',
          os: 'windows'
        },
        {
          title: 'Select All Occurrences',
          shortcut: 'Ctrl+F2',
          description: 'Select all instances of current word',
          os: 'windows'
        },
        {
          title: 'Next Selection',
          shortcut: 'Ctrl+F3',
          description: 'Add next occurrence to selection',
          os: 'windows'
        }
      ]
    },
    {
      title: 'Essential Plugins',
      items: [
        {
          title: 'Compare',
          description: 'Compare two files side by side',
          code: 'Plugins > Compare > Compare'
        },
        {
          title: 'XML Tools',
          description: 'XML formatting, validation, and manipulation',
          code: 'Pretty print, XML syntax check'
        },
        {
          title: 'JSON Viewer',
          description: 'Format and validate JSON files',
          code: 'Format JSON, JSON tree view'
        },
        {
          title: 'NppFTP',
          description: 'FTP/SFTP client integration',
          code: 'Connect to remote servers'
        },
        {
          title: 'Explorer',
          description: 'File explorer in side panel',
          code: 'Navigate files without leaving Notepad++'
        },
        {
          title: 'TextFX',
          description: 'Advanced text manipulation tools',
          code: 'HTML/XML formatting, case conversion'
        },
        {
          title: 'Python Script',
          description: 'Extend functionality with Python',
          code: 'Write custom automation scripts'
        }
      ]
    },
    {
      title: 'Regular Expressions',
      items: [
        {
          title: 'Enable Regex Mode',
          description: 'Check "Regular expression" in Find/Replace dialog',
          shortcut: 'Alt+E in find dialog'
        },
        {
          title: 'Match Any Character',
          code: '.',
          description: 'Matches any single character except newline'
        },
        {
          title: 'Match Word Boundary',
          code: '\\\\b',
          description: 'Match word boundaries',
          example: '\\\\bword\\\\b matches "word" but not "sword"'
        },
        {
          title: 'Capture Groups',
          code: '(pattern)',
          description: 'Capture text for replacement',
          example: 'Find: (\\\\w+)\\\\s+(\\\\w+), Replace: $2 $1'
        },
        {
          title: 'Character Classes',
          code: '[a-z] [0-9] [^abc]',
          description: 'Match character ranges or exclude characters'
        },
        {
          title: 'Quantifiers',
          code: '* + ? {n} {n,m}',
          description: 'Specify how many times to match',
          example: '\\\\d{3} matches exactly 3 digits'
        },
        {
          title: 'Line Anchors',
          code: '^ $',
          description: 'Match start/end of line',
          example: '^\\\\s*$ matches empty lines'
        }
      ]
    },
    {
      title: 'View & Display',
      items: [
        {
          title: 'Zoom In/Out',
          shortcut: 'Ctrl+Plus / Ctrl+Minus',
          description: 'Change font size',
          os: 'windows'
        },
        {
          title: 'Restore Default Zoom',
          shortcut: 'Ctrl+0',
          description: 'Reset zoom to 100%',
          os: 'windows'
        },
        {
          title: 'Word Wrap',
          shortcut: 'Alt+Z',
          description: 'Toggle word wrapping',
          os: 'windows'
        },
        {
          title: 'Show All Characters',
          shortcut: 'Ctrl+Shift+8',
          description: 'Display hidden characters (spaces, tabs, newlines)',
          os: 'windows'
        },
        {
          title: 'Split Screen',
          description: 'View > Move/Clone Current Document > Move to Other View',
          example: 'View same or different files side by side'
        },
        {
          title: 'Full Screen',
          shortcut: 'F11',
          description: 'Toggle full screen mode',
          os: 'windows'
        },
        {
          title: 'Distraction Free Mode',
          description: 'View > Post-It > Hide menu bar and toolbar',
          example: 'Minimal interface for focused writing'
        }
      ]
    },
    {
      title: 'Advanced Features',
      items: [
        {
          title: 'Macro Recording',
          shortcut: 'Ctrl+Shift+R',
          description: 'Start/stop macro recording',
          os: 'windows'
        },
        {
          title: 'Play Macro',
          shortcut: 'Ctrl+Shift+P',
          description: 'Execute recorded macro',
          os: 'windows'
        },
        {
          title: 'Run Multiple Times',
          description: 'Macro > Run a Macro Multiple Times',
          example: 'Execute macro on multiple lines/times'
        },
        {
          title: 'Session Management',
          description: 'File > Load/Save Session',
          example: 'Save and restore sets of open files'
        },
        {
          title: 'Document Map',
          description: 'View > Document Map',
          example: 'Miniature view of entire document'
        },
        {
          title: 'Function List',
          description: 'View > Function List',
          example: 'Show all functions/methods in code files'
        }
      ]
    }
  ]
}