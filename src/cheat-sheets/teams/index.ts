import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { VideoCameraIcon } from '@heroicons/react/24/outline'

export const teamsCheatSheet: CheatSheetDefinition = {
  id: 'teams',
  title: 'Microsoft Teams',
  description: 'Essential Microsoft Teams shortcuts, meeting controls, and collaboration features',
  category: 'Communication',
  tags: ['teams', 'microsoft', 'video-calls', 'meetings', 'collaboration', 'office365'],
  lastUpdated: '2025-10-04',
  icon: createElement(VideoCameraIcon),
  sections: [
    {
      title: 'General Navigation',
      items: [
        {
          title: 'Command Box',
          shortcut: 'Ctrl+E / Cmd+E',
          description: 'Open command box to search and take actions',
          os: 'all'
        },
        {
          title: 'Search',
          shortcut: 'Ctrl+Shift+F / Cmd+Shift+F',
          description: 'Search across teams and channels',
          os: 'all'
        },
        {
          title: 'Go to Teams',
          shortcut: 'Ctrl+3 / Cmd+3',
          description: 'Navigate to Teams tab',
          os: 'all'
        },
        {
          title: 'Go to Calendar',
          shortcut: 'Ctrl+4 / Cmd+4',
          description: 'Navigate to Calendar',
          os: 'all'
        },
        {
          title: 'Go to Calls',
          shortcut: 'Ctrl+5 / Cmd+5',
          description: 'Navigate to Calls',
          os: 'all'
        },
        {
          title: 'Go to Files',
          shortcut: 'Ctrl+6 / Cmd+6',
          description: 'Navigate to Files',
          os: 'all'
        },
        {
          title: 'Previous Team/Channel',
          shortcut: 'Ctrl+Shift+↑ / Cmd+Shift+↑',
          description: 'Go to previous item in list',
          os: 'all'
        },
        {
          title: 'Next Team/Channel',
          shortcut: 'Ctrl+Shift+↓ / Cmd+Shift+↓',
          description: 'Go to next item in list',
          os: 'all'
        }
      ]
    },
    {
      title: 'Messaging & Chat',
      items: [
        {
          title: 'New Chat',
          shortcut: 'Ctrl+N / Cmd+N',
          description: 'Start new chat or conversation',
          os: 'all'
        },
        {
          title: 'Compose Message',
          shortcut: 'C',
          description: 'Start typing in message box',
          os: 'all'
        },
        {
          title: 'Expand Compose Box',
          shortcut: 'Ctrl+Shift+X / Cmd+Shift+X',
          description: 'Expand message compose area',
          os: 'all'
        },
        {
          title: 'Send Message',
          shortcut: 'Ctrl+Enter / Cmd+Enter',
          description: 'Send message (when focus in compose)',
          os: 'all'
        },
        {
          title: 'New Line',
          shortcut: 'Shift+Enter',
          description: 'Add new line in message',
          os: 'all'
        },
        {
          title: 'Attach File',
          shortcut: 'Ctrl+O / Cmd+O',
          description: 'Attach file to message',
          os: 'all'
        },
        {
          title: 'Emoji Picker',
          shortcut: 'Ctrl+; / Cmd+;',
          description: 'Open emoji picker',
          os: 'all'
        },
        {
          title: 'Mention Someone',
          shortcut: '@[name]',
          description: 'Mention team member',
          example: '@john.doe please review'
        }
      ]
    },
    {
      title: 'Meeting Controls',
      items: [
        {
          title: 'Accept Video Call',
          shortcut: 'Ctrl+Shift+A / Cmd+Shift+A',
          description: 'Accept incoming video call',
          os: 'all'
        },
        {
          title: 'Accept Audio Call',
          shortcut: 'Ctrl+Shift+S / Cmd+Shift+S',
          description: 'Accept audio-only call',
          os: 'all'
        },
        {
          title: 'Decline Call',
          shortcut: 'Ctrl+Shift+D / Cmd+Shift+D',
          description: 'Decline incoming call',
          os: 'all'
        },
        {
          title: 'Start Video Call',
          shortcut: 'Ctrl+Shift+U / Cmd+Shift+U',
          description: 'Start video call in current chat',
          os: 'all'
        },
        {
          title: 'Mute/Unmute',
          shortcut: 'Ctrl+Shift+M / Cmd+Shift+M',
          description: 'Toggle microphone',
          os: 'all'
        },
        {
          title: 'Video On/Off',
          shortcut: 'Ctrl+Shift+O / Cmd+Shift+O',
          description: 'Toggle camera',
          os: 'all'
        },
        {
          title: 'End Call',
          shortcut: 'Ctrl+Shift+H / Cmd+Shift+H',
          description: 'Hang up call',
          os: 'all'
        },
        {
          title: 'Share Screen',
          shortcut: 'Ctrl+Shift+E / Cmd+Shift+E',
          description: 'Start screen sharing',
          os: 'all'
        }
      ]
    },
    {
      title: 'Meeting Participation',
      items: [
        {
          title: 'Raise Hand',
          shortcut: 'Ctrl+Shift+K / Cmd+Shift+K',
          description: 'Raise or lower hand',
          os: 'all'
        },
        {
          title: 'Toggle Chat',
          shortcut: 'Ctrl+Shift+P / Cmd+Shift+P',
          description: 'Show/hide meeting chat',
          os: 'all'
        },
        {
          title: 'Toggle Participants',
          shortcut: 'Ctrl+Shift+I / Cmd+Shift+I',
          description: 'Show/hide participants panel',
          os: 'all'
        },
        {
          title: 'Admit from Lobby',
          shortcut: 'Ctrl+Shift+Y / Cmd+Shift+Y',
          description: 'Admit people from lobby (organizer)',
          os: 'all'
        },
        {
          title: 'Spotlight Someone',
          description: 'Right-click participant > Spotlight',
          example: 'Make someone the main focus for all attendees'
        },
        {
          title: 'Pin for Me',
          description: 'Right-click participant > Pin for me',
          example: 'Pin someone\'s video to stay visible'
        }
      ]
    },
    {
      title: 'File Collaboration',
      items: [
        {
          title: 'Upload File',
          shortcut: 'Ctrl+Shift+O / Cmd+Shift+O',
          description: 'Upload file to current channel/chat',
          os: 'all'
        },
        {
          title: 'SharePoint Integration',
          description: 'Files are automatically synced to SharePoint',
          example: 'Access files from SharePoint or OneDrive'
        },
        {
          title: 'Co-edit Documents',
          description: 'Click on Office files to edit collaboratively',
          example: 'Multiple people can edit Word/Excel simultaneously'
        },
        {
          title: 'Version History',
          description: 'Right-click file > Version history',
          example: 'See all changes and restore previous versions'
        },
        {
          title: 'File Permissions',
          description: 'Right-click file > Manage access',
          example: 'Control who can view/edit files'
        }
      ]
    },
    {
      title: 'Teams & Channels',
      items: [
        {
          title: 'Create Team',
          description: 'Teams > Join or create team > Create team',
          example: 'Create team for projects, departments, or topics'
        },
        {
          title: 'Add Channel',
          description: 'Click \'...\' next to team name > Add channel',
          example: 'Organize discussions by topic within teams'
        },
        {
          title: 'Private Channel',
          description: 'Set privacy to Private when creating channel',
          example: 'Limit access to specific team members'
        },
        {
          title: 'Channel Moderation',
          description: 'Channel settings > Moderation',
          example: 'Control who can post and moderate content'
        },
        {
          title: 'Channel Notifications',
          description: 'Channel name > More options > Channel notifications',
          example: 'Customize notification preferences per channel'
        }
      ]
    },
    {
      title: 'Apps & Integrations',
      items: [
        {
          title: 'Add App to Team',
          description: 'More apps > Browse all apps',
          example: 'Add Planner, OneNote, Power BI, etc.'
        },
        {
          title: 'Power Automate',
          description: 'Automate workflows between Teams and other services',
          code: 'Create flows for approvals, notifications'
        },
        {
          title: 'Forms Integration',
          description: 'Create surveys and polls using Microsoft Forms',
          example: 'Add Forms tab to collect team feedback'
        },
        {
          title: 'Planner Integration',
          description: 'Manage team tasks and projects',
          example: 'Add Planner tab for task management'
        },
        {
          title: 'Whiteboard',
          description: 'Collaborate on digital whiteboards',
          shortcut: 'Click Whiteboard in meeting or add as tab'
        },
        {
          title: 'Custom Apps',
          description: 'Upload custom Teams apps (with admin permission)',
          example: 'Line-of-business applications'
        }
      ]
    },
    {
      title: 'Status & Presence',
      items: [
        {
          title: 'Set Status',
          shortcut: 'Ctrl+Shift+Y / Cmd+Shift+Y',
          description: 'Change availability status',
          os: 'all'
        },
        {
          title: 'Status Options',
          description: 'Available, Busy, Do not disturb, Be right back, Away',
          example: 'Status shows automatically based on calendar'
        },
        {
          title: 'Custom Status Message',
          description: 'Add custom message with status',
          example: 'In a meeting, Working from home, etc.'
        },
        {
          title: 'Quiet Hours',
          description: 'Settings > Privacy > Quiet hours',
          example: 'Set hours when you won\'t receive notifications'
        },
        {
          title: 'Location Status',
          description: 'Show if working from office or remotely',
          example: 'Helps team know your location context'
        }
      ]
    },
    {
      title: 'Mobile & Cross-Platform',
      items: [
        {
          title: 'Mobile App Features',
          description: 'Full Teams experience on mobile devices',
          example: 'Join meetings, chat, access files on the go'
        },
        {
          title: 'Background Blur/Effects',
          description: 'Click video effects before/during meetings',
          example: 'Blur background or use custom backgrounds'
        },
        {
          title: 'Cortana Integration',
          description: 'Voice commands for scheduling and joining meetings',
          code: 'Hey Cortana, join my Teams meeting'
        },
        {
          title: 'Offline Access',
          description: 'Desktop app works partially offline',
          example: 'Read messages, prepare content when offline'
        },
        {
          title: 'Multi-Account',
          description: 'Switch between work and personal accounts',
          example: 'Manage multiple organizations'
        }
      ]
    },
    {
      title: 'Admin & Troubleshooting',
      items: [
        {
          title: 'Clear Cache',
          description: 'Sign out and clear cache if Teams is slow',
          example: 'Settings > Sign out > Clear cache'
        },
        {
          title: 'Update Teams',
          description: 'Teams updates automatically, or check manually',
          example: 'Profile picture > Check for updates'
        },
        {
          title: 'Diagnostic Tool',
          description: 'Use built-in diagnostic tool for issues',
          code: 'Help > Run diagnostics'
        },
        {
          title: 'Meeting Recording',
          description: 'Start recording meetings (with permission)',
          example: 'More actions > Start recording'
        },
        {
          title: 'Guest Access',
          description: 'External users can join as guests',
          example: 'Admin controls guest permissions'
        }
      ]
    }
  ]
}