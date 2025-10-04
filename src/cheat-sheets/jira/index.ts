import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'

export const jiraCheatSheet: CheatSheetDefinition = {
  id: 'jira',
  title: 'Jira',
  description: 'Essential Jira shortcuts, JQL queries, and project management tips',
  category: 'Project Management',
  tags: ['jira', 'atlassian', 'project-management', 'agile', 'scrum', 'jql'],
  lastUpdated: '2025-10-04',
  icon: createElement(ClipboardDocumentListIcon),
  sections: [
    {
      title: 'Navigation Shortcuts',
      items: [
        {
          title: 'Go to Dashboard',
          shortcut: 'g + d',
          description: 'Navigate to dashboard',
          os: 'all'
        },
        {
          title: 'Find Issues',
          shortcut: 'g + i',
          description: 'Go to issue navigator',
          os: 'all'
        },
        {
          title: 'Browse Projects',
          shortcut: 'g + p',
          description: 'Navigate to projects page',
          os: 'all'
        },
        {
          title: 'Agile Boards',
          shortcut: 'g + a',
          description: 'Go to agile boards',
          os: 'all'
        },
        {
          title: 'Create Issue',
          shortcut: 'c',
          description: 'Create new issue',
          os: 'all'
        },
        {
          title: 'Quick Search',
          shortcut: '/',
          description: 'Focus on search box',
          os: 'all'
        },
        {
          title: 'Browse to a Project',
          shortcut: 'g + p, then type project key',
          description: 'Quickly navigate to specific project',
          os: 'all'
        }
      ]
    },
    {
      title: 'Issue Actions',
      items: [
        {
          title: 'Edit Issue',
          shortcut: 'e',
          description: 'Edit current issue',
          os: 'all'
        },
        {
          title: 'Comment on Issue',
          shortcut: 'm',
          description: 'Add comment to issue',
          os: 'all'
        },
        {
          title: 'Assign Issue',
          shortcut: 'a',
          description: 'Assign issue to user',
          os: 'all'
        },
        {
          title: 'Log Work',
          shortcut: 'w',
          description: 'Log time on issue',
          os: 'all'
        },
        {
          title: 'Share Issue',
          shortcut: 's',
          description: 'Share issue via email/link',
          os: 'all'
        },
        {
          title: 'Labels',
          shortcut: 'l',
          description: 'Edit issue labels',
          os: 'all'
        },
        {
          title: 'Operations Menu',
          shortcut: 'o',
          description: 'Open issue operations menu',
          os: 'all'
        },
        {
          title: 'Watch Issue',
          shortcut: 'w',
          description: 'Watch/unwatch issue',
          os: 'all'
        }
      ]
    },
    {
      title: 'Agile Board Shortcuts',
      items: [
        {
          title: 'Toggle Detail View',
          shortcut: 't',
          description: 'Show/hide issue details on board',
          os: 'all'
        },
        {
          title: 'Next Column',
          shortcut: 'j',
          description: 'Move selection to next column',
          os: 'all'
        },
        {
          title: 'Previous Column',
          shortcut: 'k',
          description: 'Move selection to previous column',
          os: 'all'
        },
        {
          title: 'Next Issue',
          shortcut: 'n',
          description: 'Select next issue',
          os: 'all'
        },
        {
          title: 'Previous Issue',
          shortcut: 'p',
          description: 'Select previous issue',
          os: 'all'
        },
        {
          title: 'Send to Top',
          shortcut: '1',
          description: 'Move issue to top of column',
          os: 'all'
        },
        {
          title: 'Send to Bottom',
          shortcut: '2',
          description: 'Move issue to bottom of column',
          os: 'all'
        }
      ]
    },
    {
      title: 'JQL - Basic Queries',
      items: [
        {
          title: 'Issues Assigned to Me',
          code: 'assignee = currentUser()',
          description: 'Find all issues assigned to current user'
        },
        {
          title: 'Issues Reported by Me',
          code: 'reporter = currentUser()',
          description: 'Find all issues created by current user'
        },
        {
          title: 'Open Issues in Project',
          code: 'project = "PROJECT_KEY" AND status != Closed',
          description: 'Find open issues in specific project'
        },
        {
          title: 'Recent Issues',
          code: 'updated >= -1w',
          description: 'Issues updated in the last week'
        },
        {
          title: 'High Priority Issues',
          code: 'priority = High',
          description: 'Find all high priority issues'
        },
        {
          title: 'Issues Due Soon',
          code: 'due <= 3d',
          description: 'Issues due within 3 days'
        }
      ]
    },
    {
      title: 'JQL - Advanced Queries',
      items: [
        {
          title: 'Multiple Projects',
          code: 'project in ("PROJ1", "PROJ2", "PROJ3")',
          description: 'Issues from multiple projects'
        },
        {
          title: 'Issues Without Assignee',
          code: 'assignee is EMPTY',
          description: 'Unassigned issues'
        },
        {
          title: 'Issues with Specific Label',
          code: 'labels = "urgent" OR labels = "critical"',
          description: 'Issues with specific labels'
        },
        {
          title: 'Issues Created This Sprint',
          code: 'created >= startOfWeek(-2w) AND created <= endOfWeek()',
          description: 'Issues created in current/recent sprint'
        },
        {
          title: 'Bugs Fixed in Version',
          code: 'type = Bug AND fixVersion = "1.2.0"',
          description: 'Bugs fixed in specific version'
        },
        {
          title: 'Overdue Issues',
          code: 'due < now() AND status != Closed',
          description: 'Issues that are overdue'
        },
        {
          title: 'Issues with Comments',
          code: 'comment ~ "performance"',
          description: 'Issues with comments containing specific text'
        }
      ]
    },
    {
      title: 'JQL - Date Functions',
      items: [
        {
          title: 'Today',
          code: 'created = now()',
          description: 'Issues created today'
        },
        {
          title: 'Last 7 Days',
          code: 'updated >= -1w',
          description: 'Issues updated in last week'
        },
        {
          title: 'This Month',
          code: 'created >= startOfMonth() AND created <= endOfMonth()',
          description: 'Issues created this month'
        },
        {
          title: 'Business Days',
          code: 'created >= -5d AND created <= now()',
          description: 'Issues from last 5 days'
        },
        {
          title: 'Specific Date Range',
          code: 'created >= "2025-01-01" AND created <= "2025-12-31"',
          description: 'Issues within specific date range'
        }
      ]
    },
    {
      title: 'Workflow & Status',
      items: [
        {
          title: 'Transition Issue',
          description: 'Click on issue status to see available transitions',
          example: 'To Do → In Progress → Done'
        },
        {
          title: 'Bulk Change Issues',
          description: 'Select multiple issues and use Tools > Bulk Change',
          shortcut: 'Select issues + Tools menu'
        },
        {
          title: 'Custom Workflow',
          description: 'Configure workflow: Project Settings > Workflows',
          example: 'Add custom statuses like "Code Review", "Testing"'
        },
        {
          title: 'Status Categories',
          code: 'statusCategory = "To Do"',
          description: 'Query by status categories (To Do, In Progress, Done)'
        },
        {
          title: 'Resolution Types',
          code: 'resolution = Fixed',
          description: 'Filter by resolution (Fixed, Won\'t Fix, Duplicate, etc.)'
        }
      ]
    },
    {
      title: 'Reporting & Dashboards',
      items: [
        {
          title: 'Create Dashboard',
          description: 'Dashboards > Create Dashboard',
          example: 'Add gadgets for charts, filters, calendars'
        },
        {
          title: 'Burndown Chart',
          description: 'Reports > Burndown Chart (for Scrum boards)',
          example: 'Track sprint progress and remaining work'
        },
        {
          title: 'Velocity Chart',
          description: 'Reports > Velocity Chart',
          example: 'Measure team delivery over sprints'
        },
        {
          title: 'Time Tracking Report',
          description: 'Reports > Time Tracking Report',
          example: 'Analyze time spent on issues'
        },
        {
          title: 'Export Issues',
          description: 'Use Export button in Issue Navigator',
          example: 'Excel, CSV, XML, Word formats available'
        },
        {
          title: 'Saved Filters',
          description: 'Save JQL queries as filters for reuse',
          shortcut: 'After JQL search, click "Save as" button'
        }
      ]
    },
    {
      title: 'Project Configuration',
      items: [
        {
          title: 'Issue Types',
          description: 'Project Settings > Issue Types',
          example: 'Story, Task, Bug, Epic, Subtask'
        },
        {
          title: 'Custom Fields',
          description: 'Project Settings > Fields',
          example: 'Add fields like "Environment", "Browser", "Priority"'
        },
        {
          title: 'Versions',
          description: 'Project Settings > Versions',
          example: 'Manage release versions and fix versions'
        },
        {
          title: 'Components',
          description: 'Project Settings > Components',
          example: 'Organize issues by component (Frontend, Backend, API)'
        },
        {
          title: 'Permissions',
          description: 'Project Settings > Permissions',
          example: 'Control who can view/edit issues'
        },
        {
          title: 'Notification Scheme',
          description: 'Project Settings > Notifications',
          example: 'Configure email notifications for events'
        }
      ]
    },
    {
      title: 'Integration Tips',
      items: [
        {
          title: 'Smart Commits',
          description: 'Reference Jira issues in Git commits',
          example: 'git commit -m "PROJ-123 Fix login bug #resolve"'
        },
        {
          title: 'Confluence Integration',
          description: 'Link Jira issues to Confluence pages',
          example: 'Use Jira Issue macro in Confluence'
        },
        {
          title: 'Slack Integration',
          description: 'Get Jira notifications in Slack channels',
          code: '/jira create'
        },
        {
          title: 'Email to Issue',
          description: 'Create issues by sending emails',
          example: 'Configure email handler in Mail settings'
        },
        {
          title: 'REST API Access',
          description: 'Access Jira data programmatically',
          code: 'GET /rest/api/2/issue/{issueKey}'
        },
        {
          title: 'Automation Rules',
          description: 'Create rules to automate common tasks',
          example: 'Auto-assign issues based on component'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          title: 'Performance Issues',
          description: 'Use simpler JQL queries, avoid wildcards',
          example: 'project = PROJ instead of text ~ "something"'
        },
        {
          title: 'Permission Errors',
          description: 'Check project permissions and user groups',
          example: 'Admin > User Management > Groups'
        },
        {
          title: 'Workflow Problems',
          description: 'Check workflow conditions and validators',
          example: 'Project Settings > Workflows > Edit'
        },
        {
          title: 'Email Notifications',
          description: 'Verify notification schemes and user preferences',
          example: 'Profile > Email > Preferences'
        },
        {
          title: 'Search Index Issues',
          description: 'Reindex Jira if search results are incorrect',
          example: 'Admin > System > Indexing'
        }
      ]
    }
  ]
}