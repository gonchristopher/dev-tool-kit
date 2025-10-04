import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'

export const slackCheatSheet: CheatSheetDefinition = {
  id: 'slack',
  title: 'Slack',
  description: 'Essential Slack shortcuts, formatting, and productivity tips for team collaboration',
  category: 'Communication',
  tags: ['slack', 'communication', 'team', 'collaboration', 'chat', 'shortcuts'],
  lastUpdated: '2025-10-04',
  icon: createElement(ChatBubbleLeftRightIcon),
  sections: [
    {
      title: 'Navigation Shortcuts',
      items: [
        {
          title: 'Quick Switcher',
          shortcut: 'Ctrl+K / Cmd+K',
          description: 'Switch between channels and DMs',
          os: 'all'
        },
        {
          title: 'Browse Channels',
          shortcut: 'Ctrl+Shift+L / Cmd+Shift+L',
          description: 'Browse all channels',
          os: 'all'
        },
        {
          title: 'Direct Messages',
          shortcut: 'Ctrl+Shift+K / Cmd+Shift+K',
          description: 'Open direct messages',
          os: 'all'
        },
        {
          title: 'Previous Channel',
          shortcut: 'Alt+← / Cmd+[',
          description: 'Go to previous channel',
          os: 'all'
        },
        {
          title: 'Next Channel',
          shortcut: 'Alt+→ / Cmd+]',
          description: 'Go to next channel',
          os: 'all'
        },
        {
          title: 'Unread Navigation',
          shortcut: 'Alt+Shift+↑/↓ / Opt+Shift+↑/↓',
          description: 'Jump to unread messages',
          os: 'all'
        },
        {
          title: 'Search',
          shortcut: 'Ctrl+G / Cmd+G',
          description: 'Search messages and files',
          os: 'all'
        }
      ]
    },
    {
      title: 'Message Actions',
      items: [
        {
          title: 'Edit Last Message',
          shortcut: '↑ (in empty compose)',
          description: 'Edit your last sent message',
          os: 'all'
        },
        {
          title: 'Reply to Message',
          shortcut: 'R (when message selected)',
          description: 'Reply in thread',
          os: 'all'
        },
        {
          title: 'Add Reaction',
          shortcut: 'Ctrl+Shift+\\ / Cmd+Shift+\\',
          description: 'Add emoji reaction',
          os: 'all'
        },
        {
          title: 'Mark as Unread',
          shortcut: 'Alt+Click / Opt+Click',
          description: 'Mark message as unread',
          os: 'all'
        },
        {
          title: 'Save Message',
          shortcut: 'S (when message selected)',
          description: 'Save message for later',
          os: 'all'
        },
        {
          title: 'Share Message',
          shortcut: 'Ctrl+Shift+S / Cmd+Shift+S',
          description: 'Share message to channel',
          os: 'all'
        }
      ]
    },
    {
      title: 'Text Formatting',
      items: [
        {
          title: 'Bold Text',
          code: '*bold text*',
          description: 'Make text bold',
          example: '*This is bold*'
        },
        {
          title: 'Italic Text',
          code: '_italic text_',
          description: 'Make text italic',
          example: '_This is italic_'
        },
        {
          title: 'Strikethrough',
          code: '~strikethrough~',
          description: 'Strike through text',
          example: '~This is crossed out~'
        },
        {
          title: 'Inline Code',
          code: '`code`',
          description: 'Inline code formatting',
          example: '`console.log("hello")`'
        },
        {
          title: 'Code Block',
          code: '```\ncode block\n```',
          description: 'Multi-line code block',
          example: '```javascript\nfunction hello() {\n  return "world";\n}\n```'
        },
        {
          title: 'Quote',
          code: '> quoted text',
          description: 'Quote text',
          example: '> This is a quote'
        },
        {
          title: 'Bullet List',
          code: '• item 1\n• item 2',
          description: 'Create bullet points',
          example: '• First point\n• Second point'
        },
        {
          title: 'Numbered List',
          code: '1. item 1\n2. item 2',
          description: 'Create numbered list',
          example: '1. First step\n2. Second step'
        }
      ]
    },
    {
      title: 'Mentions & Notifications',
      items: [
        {
          title: 'Mention User',
          code: '@username',
          description: 'Mention specific user',
          example: '@john.doe can you review this?'
        },
        {
          title: 'Mention Channel',
          code: '@channel',
          description: 'Notify all channel members'
        },
        {
          title: 'Mention Everyone',
          code: '@everyone',
          description: 'Notify all workspace members'
        },
        {
          title: 'Mention Here',
          code: '@here',
          description: 'Notify only active channel members'
        },
        {
          title: 'Link to Channel',
          code: '#channel-name',
          description: 'Link to another channel',
          example: 'See discussion in #general'
        },
        {
          title: 'Date Mention',
          code: '<!date^timestamp^date format>',
          description: 'Insert date that shows in user\'s timezone'
        }
      ]
    },
    {
      title: 'File & Media Sharing',
      items: [
        {
          title: 'Upload File',
          shortcut: 'Ctrl+U / Cmd+U',
          description: 'Upload file or image',
          os: 'all'
        },
        {
          title: 'Create Snippet',
          shortcut: 'Ctrl+Shift+Enter / Cmd+Shift+Enter',
          description: 'Create code snippet',
          os: 'all'
        },
        {
          title: 'Screen Recording',
          description: 'Use /record slash command',
          code: '/record'
        },
        {
          title: 'Audio Message',
          description: 'Click microphone icon in message box',
          shortcut: 'Hold space to record (in some configurations)'
        },
        {
          title: 'Giphy Integration',
          code: '/giphy [search term]',
          description: 'Add animated GIF',
          example: '/giphy celebration'
        }
      ]
    },
    {
      title: 'Workflow & Productivity',
      items: [
        {
          title: 'Set Status',
          shortcut: 'Ctrl+Shift+Y / Cmd+Shift+Y',
          description: 'Set your status',
          os: 'all'
        },
        {
          title: 'Do Not Disturb',
          shortcut: 'Ctrl+Shift+D / Cmd+Shift+D',
          description: 'Toggle do not disturb',
          os: 'all'
        },
        {
          title: 'Create Reminder',
          code: '/remind [@someone or #channel or me] [what] [when]',
          description: 'Set reminders',
          example: '/remind me to review PR tomorrow at 9am'
        },
        {
          title: 'Create Poll',
          code: '/poll "Question" "Option 1" "Option 2"',
          description: 'Create a poll',
          example: '/poll "Lunch place?" "Pizza" "Sushi" "Burgers"'
        },
        {
          title: 'Workflow Builder',
          description: 'Automate routine tasks',
          example: 'Create workflows for onboarding, approvals'
        },
        {
          title: 'Saved Items',
          shortcut: 'Ctrl+Shift+S / Cmd+Shift+S',
          description: 'View saved messages',
          os: 'all'
        }
      ]
    },
    {
      title: 'Calls & Huddles',
      items: [
        {
          title: 'Start Call',
          shortcut: 'Ctrl+Shift+C / Cmd+Shift+C',
          description: 'Start voice or video call',
          os: 'all'
        },
        {
          title: 'Join Huddle',
          description: 'Click huddle button in channel',
          shortcut: 'Toggle headphones icon'
        },
        {
          title: 'Mute/Unmute',
          shortcut: 'M (during call)',
          description: 'Toggle microphone',
          os: 'all'
        },
        {
          title: 'Video On/Off',
          shortcut: 'V (during call)',
          description: 'Toggle video',
          os: 'all'
        },
        {
          title: 'Screen Share',
          shortcut: 'Ctrl+Shift+S / Cmd+Shift+S (during call)',
          description: 'Share your screen',
          os: 'all'
        }
      ]
    },
    {
      title: 'Search & Filters',
      items: [
        {
          title: 'Search by User',
          code: 'from:@username',
          description: 'Find messages from specific user',
          example: 'from:@sarah meeting notes'
        },
        {
          title: 'Search in Channel',
          code: 'in:#channel-name',
          description: 'Search within specific channel',
          example: 'in:#general announcement'
        },
        {
          title: 'Search by Date',
          code: 'after:2025-01-01 before:2025-12-31',
          description: 'Search messages in date range'
        },
        {
          title: 'Search Files',
          code: 'has:link or has:file',
          description: 'Find messages with links or files'
        },
        {
          title: 'Search Mentions',
          code: 'mentions:me',
          description: 'Find messages mentioning you'
        },
        {
          title: 'Search Reactions',
          code: 'has::thumbsup:',
          description: 'Find messages with specific emoji reactions'
        }
      ]
    },
    {
      title: 'Keyboard Shortcuts',
      items: [
        {
          title: 'Show Shortcuts',
          shortcut: 'Ctrl+/ / Cmd+/',
          description: 'Display all keyboard shortcuts',
          os: 'all'
        },
        {
          title: 'Focus Message Box',
          shortcut: 'C',
          description: 'Jump to compose message',
          os: 'all'
        },
        {
          title: 'Emoji Picker',
          shortcut: 'Ctrl+Shift+; / Cmd+Shift+;',
          description: 'Open emoji picker',
          os: 'all'
        },
        {
          title: 'Toggle Sidebar',
          shortcut: 'Ctrl+Shift+D / Cmd+Shift+D',
          description: 'Show/hide left sidebar',
          os: 'all'
        },
        {
          title: 'Open Preferences',
          shortcut: 'Ctrl+, / Cmd+,',
          description: 'Open settings',
          os: 'all'
        }
      ]
    },
    {
      title: 'Integration Tips',
      items: [
        {
          title: 'GitHub Integration',
          description: 'Get notifications for GitHub events',
          code: '/github subscribe owner/repo'
        },
        {
          title: 'Google Calendar',
          description: 'Sync calendar events with Slack',
          code: '/gcal settings'
        },
        {
          title: 'Zoom Integration',
          description: 'Start Zoom meetings from Slack',
          code: '/zoom'
        },
        {
          title: 'Custom Slash Commands',
          description: 'Create custom integrations',
          example: '/weather [city] - Get weather info'
        },
        {
          title: 'Workflow Automation',
          description: 'Use Zapier or built-in workflows',
          example: 'Auto-create tickets from messages'
        }
      ]
    }
  ]
}