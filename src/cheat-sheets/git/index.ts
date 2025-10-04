import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline'

export const gitCheatSheet: CheatSheetDefinition = {
  id: 'git',
  title: 'Git Commands',
  description: 'Essential Git commands, branching strategies, and troubleshooting tips',
  category: 'Version Control',
  tags: ['git', 'version-control', 'github', 'commands', 'branching'],
  lastUpdated: '2025-10-04',
  icon: createElement(CodeBracketSquareIcon),
  sections: [
    {
      title: 'Basic Commands',
      items: [
        {
          title: 'Initialize Repository',
          code: 'git init',
          description: 'Create a new Git repository'
        },
        {
          title: 'Clone Repository',
          code: 'git clone <url>',
          description: 'Download a repository from remote URL',
          example: 'git clone https://github.com/user/repo.git'
        },
        {
          title: 'Check Status',
          code: 'git status',
          description: 'Show working directory status'
        },
        {
          title: 'Add Files',
          code: 'git add <file>',
          description: 'Stage files for commit',
          example: 'git add . (add all files)\ngit add *.js (add all .js files)'
        },
        {
          title: 'Commit Changes',
          code: 'git commit -m "message"',
          description: 'Commit staged changes with message'
        },
        {
          title: 'Commit All Changes',
          code: 'git commit -am "message"',
          description: 'Stage and commit all tracked files'
        }
      ]
    },
    {
      title: 'Remote Operations',
      items: [
        {
          title: 'Add Remote',
          code: 'git remote add origin <url>',
          description: 'Add remote repository URL'
        },
        {
          title: 'List Remotes',
          code: 'git remote -v',
          description: 'Show all remote repositories'
        },
        {
          title: 'Push Changes',
          code: 'git push origin main',
          description: 'Push commits to remote branch'
        },
        {
          title: 'Pull Changes',
          code: 'git pull origin main',
          description: 'Fetch and merge remote changes'
        },
        {
          title: 'Fetch Updates',
          code: 'git fetch',
          description: 'Download remote changes without merging'
        },
        {
          title: 'Set Upstream',
          code: 'git push -u origin main',
          description: 'Push and set upstream tracking'
        }
      ]
    },
    {
      title: 'Branching',
      items: [
        {
          title: 'List Branches',
          code: 'git branch',
          description: 'Show local branches (add -r for remote)',
          example: 'git branch -a (show all branches)'
        },
        {
          title: 'Create Branch',
          code: 'git branch <branch-name>',
          description: 'Create new branch from current HEAD'
        },
        {
          title: 'Switch Branch',
          code: 'git checkout <branch-name>',
          description: 'Switch to existing branch'
        },
        {
          title: 'Create and Switch',
          code: 'git checkout -b <branch-name>',
          description: 'Create new branch and switch to it'
        },
        {
          title: 'Delete Branch',
          code: 'git branch -d <branch-name>',
          description: 'Delete merged branch (use -D for force)'
        },
        {
          title: 'Merge Branch',
          code: 'git merge <branch-name>',
          description: 'Merge specified branch into current branch'
        },
        {
          title: 'Rebase Branch',
          code: 'git rebase main',
          description: 'Rebase current branch onto main'
        }
      ]
    },
    {
      title: 'History & Logs',
      items: [
        {
          title: 'View Log',
          code: 'git log',
          description: 'Show commit history'
        },
        {
          title: 'Compact Log',
          code: 'git log --oneline',
          description: 'Show condensed commit history'
        },
        {
          title: 'Graphical Log',
          code: 'git log --graph --oneline --all',
          description: 'Show branch topology with commits'
        },
        {
          title: 'File History',
          code: 'git log -p <file>',
          description: 'Show commit history for specific file'
        },
        {
          title: 'Show Changes',
          code: 'git show <commit-hash>',
          description: 'Show details of specific commit'
        },
        {
          title: 'Blame File',
          code: 'git blame <file>',
          description: 'Show line-by-line commit history'
        }
      ]
    },
    {
      title: 'Undoing Changes',
      items: [
        {
          title: 'Unstage File',
          code: 'git reset HEAD <file>',
          description: 'Remove file from staging area'
        },
        {
          title: 'Discard Changes',
          code: 'git checkout -- <file>',
          description: 'Discard unstaged changes in file'
        },
        {
          title: 'Soft Reset',
          code: 'git reset --soft HEAD~1',
          description: 'Undo last commit, keep changes staged'
        },
        {
          title: 'Mixed Reset',
          code: 'git reset HEAD~1',
          description: 'Undo last commit, unstage changes'
        },
        {
          title: 'Hard Reset',
          code: 'git reset --hard HEAD~1',
          description: 'Undo last commit, discard all changes'
        },
        {
          title: 'Revert Commit',
          code: 'git revert <commit-hash>',
          description: 'Create new commit that undoes previous commit'
        },
        {
          title: 'Amend Commit',
          code: 'git commit --amend',
          description: 'Modify the last commit message or files'
        }
      ]
    },
    {
      title: 'Stashing',
      items: [
        {
          title: 'Stash Changes',
          code: 'git stash',
          description: 'Temporarily save uncommitted changes'
        },
        {
          title: 'Stash with Message',
          code: 'git stash save "message"',
          description: 'Stash changes with descriptive message'
        },
        {
          title: 'List Stashes',
          code: 'git stash list',
          description: 'Show all saved stashes'
        },
        {
          title: 'Apply Stash',
          code: 'git stash apply',
          description: 'Apply most recent stash'
        },
        {
          title: 'Apply Specific Stash',
          code: 'git stash apply stash@{n}',
          description: 'Apply specific stash by index'
        },
        {
          title: 'Pop Stash',
          code: 'git stash pop',
          description: 'Apply and remove most recent stash'
        },
        {
          title: 'Drop Stash',
          code: 'git stash drop stash@{n}',
          description: 'Delete specific stash'
        }
      ]
    },
    {
      title: 'Configuration',
      items: [
        {
          title: 'Set Username',
          code: 'git config --global user.name "Name"',
          description: 'Set global username'
        },
        {
          title: 'Set Email',
          code: 'git config --global user.email "email@example.com"',
          description: 'Set global email address'
        },
        {
          title: 'List Config',
          code: 'git config --list',
          description: 'Show all configuration settings'
        },
        {
          title: 'Set Editor',
          code: 'git config --global core.editor "code --wait"',
          description: 'Set default editor (VS Code example)'
        },
        {
          title: 'Enable Colors',
          code: 'git config --global color.ui auto',
          description: 'Enable colored output'
        },
        {
          title: 'Set Alias',
          code: 'git config --global alias.st status',
          description: 'Create command alias',
          example: 'git config --global alias.co checkout'
        }
      ]
    },
    {
      title: 'Advanced Operations',
      items: [
        {
          title: 'Interactive Rebase',
          code: 'git rebase -i HEAD~n',
          description: 'Interactively rebase last n commits'
        },
        {
          title: 'Cherry Pick',
          code: 'git cherry-pick <commit-hash>',
          description: 'Apply specific commit to current branch'
        },
        {
          title: 'Squash Commits',
          code: 'git reset --soft HEAD~n && git commit',
          description: 'Combine last n commits into one'
        },
        {
          title: 'Find by Content',
          code: 'git grep "search-term"',
          description: 'Search for text across all files'
        },
        {
          title: 'Binary Search Bug',
          code: 'git bisect start',
          description: 'Start binary search to find bug introduction',
          example: 'git bisect bad HEAD\ngit bisect good <good-commit>'
        },
        {
          title: 'Clean Untracked Files',
          code: 'git clean -fd',
          description: 'Remove untracked files and directories'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          title: 'Resolve Merge Conflicts',
          description: 'Edit conflicted files, then add and commit',
          example: '1. Edit files to resolve <<<< ==== >>>>\n2. git add <file>\n3. git commit'
        },
        {
          title: 'Abort Merge',
          code: 'git merge --abort',
          description: 'Cancel ongoing merge and return to pre-merge state'
        },
        {
          title: 'Abort Rebase',
          code: 'git rebase --abort',
          description: 'Cancel ongoing rebase'
        },
        {
          title: 'Force Push (Dangerous)',
          code: 'git push --force-with-lease',
          description: 'Safer force push that checks for remote changes'
        },
        {
          title: 'Recover Lost Commits',
          code: 'git reflog',
          description: 'Show reference log to find lost commits'
        },
        {
          title: 'Check Remote URL',
          code: 'git remote get-url origin',
          description: 'Display the URL of origin remote'
        }
      ]
    }
  ]
}