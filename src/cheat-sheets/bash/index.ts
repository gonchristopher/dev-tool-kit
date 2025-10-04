import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export const bashCheatSheet: CheatSheetDefinition = {
  id: 'bash',
  title: 'Bash Scripting',
  description: 'Essential Bash commands, scripting syntax, and system administration utilities',
  category: 'System',
  tags: ['bash', 'shell', 'linux', 'scripting', 'terminal', 'unix', 'command-line'],
  lastUpdated: '2025-10-04',
  icon: createElement(CommandLineIcon),
  sections: [
    {
      title: 'Basic Commands',
      items: [
        {
          title: 'Navigation',
          code: 'pwd\nls -la\ncd /path/to/directory\ncd ~ (home)\ncd - (previous)',
          description: 'Navigate the file system',
          example: 'ls -la shows detailed listing including hidden files'
        },
        {
          title: 'File Operations',
          code: 'touch file.txt\ncp source dest\nmv old new\nrm file\nrm -rf directory',
          description: 'Create, copy, move, and delete files',
          example: '-r recursive, -f force, -i interactive'
        },
        {
          title: 'Directory Operations',
          code: 'mkdir directory\nmkdir -p path/to/directory\nrmdir directory\nfind /path -name "*.txt"',
          description: 'Work with directories',
          example: '-p creates parent directories as needed'
        },
        {
          title: 'File Content',
          code: 'cat file.txt\nless file.txt\nhead -n 10 file.txt\ntail -f logfile.txt',
          description: 'View and monitor file contents',
          example: 'tail -f follows file changes in real-time'
        },
        {
          title: 'File Permissions',
          code: 'chmod 755 file\nchown user:group file\nls -l (view permissions)',
          description: 'Manage file permissions and ownership',
          example: '755: rwxr-xr-x (owner: rwx, group: r-x, others: r-x)'
        }
      ]
    },
    {
      title: 'Text Processing',
      items: [
        {
          title: 'Grep - Search Text',
          code: 'grep "pattern" file.txt\ngrep -r "pattern" /directory\ngrep -i "pattern" file (case insensitive)',
          description: 'Search for patterns in text',
          example: 'grep -n shows line numbers, -v inverts match'
        },
        {
          title: 'Sed - Stream Editor',
          code: 'sed "s/old/new/g" file.txt\nsed -i "s/old/new/g" file.txt (in-place)',
          description: 'Find and replace text',
          example: 'g flag replaces all occurrences, not just first'
        },
        {
          title: 'Awk - Pattern Processing',
          code: 'awk "{print $1}" file.txt\nawk -F":" "{print $1}" /etc/passwd',
          description: 'Process structured text data',
          example: '$1, $2, etc. are field references, -F sets field separator'
        },
        {
          title: 'Sort and Unique',
          code: 'sort file.txt\nsort -n numbers.txt (numeric)\nuniq file.txt\nsort file.txt | uniq',
          description: 'Sort lines and remove duplicates',
          example: 'sort | uniq removes duplicate lines'
        },
        {
          title: 'Cut and Paste',
          code: 'cut -d"," -f1,3 file.csv\npaste file1 file2',
          description: 'Extract columns and join files',
          example: 'cut extracts fields, paste joins lines from multiple files'
        },
        {
          title: 'Word Count',
          code: 'wc -l file.txt (lines)\nwc -w file.txt (words)\nwc -c file.txt (characters)',
          description: 'Count lines, words, and characters'
        }
      ]
    },
    {
      title: 'Variables & Environment',
      items: [
        {
          title: 'Variable Assignment',
          code: 'name="John"\nage=25\nreadonly PI=3.14159',
          description: 'Create and assign variables',
          example: 'No spaces around = sign, use readonly for constants'
        },
        {
          title: 'Variable Usage',
          code: 'echo $name\necho ${name}\necho "Hello $name"',
          description: 'Access variable values',
          example: 'Curly braces {} useful for complex expressions'
        },
        {
          title: 'Environment Variables',
          code: 'export PATH=$PATH:/new/path\nexport DATABASE_URL="connection_string"\nenv (list all)',
          description: 'Set and view environment variables',
          example: 'export makes variables available to child processes'
        },
        {
          title: 'Special Variables',
          code: '$0 (script name)\n$1, $2... (arguments)\n$# (argument count)\n$? (exit status)',
          description: 'Built-in script variables',
          example: '$@ all arguments, $* all arguments as single word'
        },
        {
          title: 'Command Substitution',
          code: 'result=$(command)\nresult=`command`\nfiles=$(ls *.txt)',
          description: 'Capture command output in variables',
          example: '$() syntax is preferred over backticks'
        }
      ]
    },
    {
      title: 'Control Flow',
      items: [
        {
          title: 'If Statements',
          code: 'if [ condition ]; then\n  echo "true"\nelse\n  echo "false"\nfi',
          description: 'Conditional execution',
          example: 'Spaces around brackets are required'
        },
        {
          title: 'Test Conditions',
          code: '[ -f file ] (file exists)\n[ -d dir ] (directory exists)\n[ "$a" = "$b" ] (string equal)',
          description: 'Common test conditions',
          example: '-eq (equal), -ne (not equal), -lt (less than), -gt (greater)'
        },
        {
          title: 'For Loops',
          code: 'for i in {1..10}; do\n  echo $i\ndone\n\nfor file in *.txt; do\n  echo $file\ndone',
          description: 'Iterate over sequences or files'
        },
        {
          title: 'While Loops',
          code: 'while [ condition ]; do\n  # commands\ndone\n\nwhile read line; do\n  echo $line\ndone < file.txt',
          description: 'Loop while condition is true'
        },
        {
          title: 'Case Statements',
          code: 'case $1 in\n  "start") echo "Starting...";;\n  "stop") echo "Stopping...";;\n  *) echo "Unknown command";;\nesac',
          description: 'Multi-way branching',
          example: 'Similar to switch statements in other languages'
        }
      ]
    },
    {
      title: 'Functions',
      items: [
        {
          title: 'Function Definition',
          code: 'function greet() {\n  echo "Hello $1"\n}\n\ngreet() {\n  local name=$1\n  echo "Hello $name"\n}',
          description: 'Define reusable functions',
          example: 'Use local keyword for function-scoped variables'
        },
        {
          title: 'Function Parameters',
          code: 'greet "John"\ngreet $username',
          description: 'Call functions with arguments',
          example: 'Arguments accessed as $1, $2, etc. inside function'
        },
        {
          title: 'Return Values',
          code: 'get_user_count() {\n  local count=$(wc -l < /etc/passwd)\n  echo $count\n}\nuser_count=$(get_user_count)',
          description: 'Return values from functions',
          example: 'Use echo to return values, capture with command substitution'
        },
        {
          title: 'Function Libraries',
          code: 'source /path/to/functions.sh\n. /path/to/functions.sh',
          description: 'Load functions from external files',
          example: 'source and . are equivalent'
        }
      ]
    },
    {
      title: 'Input/Output & Redirection',
      items: [
        {
          title: 'Output Redirection',
          code: 'command > file.txt (overwrite)\ncommand >> file.txt (append)\ncommand 2> error.log (stderr)',
          description: 'Redirect command output to files',
          example: '&> redirects both stdout and stderr'
        },
        {
          title: 'Input Redirection',
          code: 'command < input.txt\ncommand <<< "string"\ncommand << EOF\\nline1\\nline2\\nEOF',
          description: 'Provide input to commands',
          example: 'Here documents (<<) useful for multi-line input'
        },
        {
          title: 'Pipes',
          code: 'command1 | command2\nps aux | grep nginx | awk "{print $2}"',
          description: 'Chain commands together',
          example: 'Output of first command becomes input of second'
        },
        {
          title: 'Tee Command',
          code: 'command | tee file.txt\ncommand | tee -a file.txt (append)',
          description: 'Write output to file and stdout simultaneously',
          example: 'Useful for logging while seeing output'
        },
        {
          title: 'User Input',
          code: 'read -p "Enter name: " name\nread -s password (silent)\nread -t 10 input (timeout)',
          description: 'Get input from user',
          example: '-p displays prompt, -s hides input, -t sets timeout'
        }
      ]
    },
    {
      title: 'Process Management',
      items: [
        {
          title: 'Process Control',
          code: 'command & (background)\njobs (list jobs)\nfg (foreground)\nbg (background)',
          description: 'Manage running processes',
          example: 'Ctrl+Z suspends, fg brings back to foreground'
        },
        {
          title: 'Process Information',
          code: 'ps aux\ntop\nhtop\npgrep nginx\npkill -f "process name"',
          description: 'View and manage processes',
          example: 'ps shows processes, top shows real-time system info'
        },
        {
          title: 'Kill Processes',
          code: 'kill PID\nkill -9 PID (force kill)\nkillall process_name\npkill pattern',
          description: 'Terminate processes',
          example: 'SIGTERM (15) is default, SIGKILL (9) force kills'
        },
        {
          title: 'Process Monitoring',
          code: 'nohup command & (run after logout)\nscreen (terminal multiplexer)\ntmux (modern alternative)',
          description: 'Keep processes running',
          example: 'nohup prevents termination on logout'
        }
      ]
    },
    {
      title: 'System Information',
      items: [
        {
          title: 'System Stats',
          code: 'df -h (disk usage)\ndu -sh /path (directory size)\nfree -h (memory usage)\nuptime',
          description: 'Check system resources',
          example: '-h flag shows human-readable sizes'
        },
        {
          title: 'System Info',
          code: 'uname -a (system info)\nwhoami (current user)\nid (user/group IDs)\ndate',
          description: 'Display system and user information'
        },
        {
          title: 'Network Info',
          code: 'ifconfig\nip addr show\nnetstat -tuln\nss -tuln (modern alternative)',
          description: 'Network configuration and connections',
          example: 'ss is faster and more feature-rich than netstat'
        },
        {
          title: 'File System',
          code: 'mount\nlsblk (block devices)\nfile filename (file type)\nwhich command (locate binary)',
          description: 'File system and command information'
        }
      ]
    },
    {
      title: 'Archives & Compression',
      items: [
        {
          title: 'Tar Archives',
          code: 'tar -cvf archive.tar files/\ntar -xvf archive.tar\ntar -tvf archive.tar (list)',
          description: 'Create and extract tar archives',
          example: 'c: create, x: extract, t: list, v: verbose, f: file'
        },
        {
          title: 'Compressed Archives',
          code: 'tar -czvf archive.tar.gz files/\ntar -xzvf archive.tar.gz',
          description: 'Work with gzip compressed archives',
          example: 'z: gzip compression, j: bzip2 compression'
        },
        {
          title: 'Zip Files',
          code: 'zip -r archive.zip directory/\nunzip archive.zip\nunzip -l archive.zip (list)',
          description: 'Create and extract zip files',
          example: '-r recursively includes subdirectories'
        },
        {
          title: 'Individual Compression',
          code: 'gzip file.txt\ngunzip file.txt.gz\nbzip2 file.txt\nbunzip2 file.txt.bz2',
          description: 'Compress individual files'
        }
      ]
    },
    {
      title: 'Networking & Remote',
      items: [
        {
          title: 'SSH',
          code: 'ssh user@hostname\nssh -i keyfile user@hostname\nscp file user@host:/path',
          description: 'Secure shell and file transfer',
          example: 'scp copies files over SSH'
        },
        {
          title: 'HTTP Requests',
          code: 'curl -X GET https://api.example.com\ncurl -d "data" -X POST url\nwget https://example.com/file',
          description: 'Make HTTP requests and download files',
          example: 'curl is more flexible, wget better for downloads'
        },
        {
          title: 'Network Testing',
          code: 'ping google.com\ntraceroute google.com\nnslookup domain.com\ndig domain.com',
          description: 'Test network connectivity and DNS',
          example: 'ping tests connectivity, traceroute shows path'
        },
        {
          title: 'Port Testing',
          code: 'telnet hostname port\nnc -zv hostname port\nnmap -p port hostname',
          description: 'Test port connectivity',
          example: 'nc (netcat) is versatile network utility'
        }
      ]
    },
    {
      title: 'Scripting Best Practices',
      items: [
        {
          title: 'Script Header',
          code: '#!/bin/bash\nset -e (exit on error)\nset -u (exit on undefined variable)',
          description: 'Start scripts with proper shebang and settings',
          example: 'set -x enables debug mode (shows commands)'
        },
        {
          title: 'Error Handling',
          code: 'command || { echo "Failed"; exit 1; }\nif ! command; then echo "Error"; fi',
          description: 'Handle command failures gracefully',
          example: '|| executes if previous command fails'
        },
        {
          title: 'Parameter Validation',
          code: 'if [ $# -lt 1 ]; then\n  echo "Usage: $0 <argument>"\n  exit 1\nfi',
          description: 'Validate script arguments',
          example: '$# contains the number of arguments'
        },
        {
          title: 'Logging',
          code: 'exec > >(tee -a script.log)\nexec 2>&1\necho "$(date): Starting script"',
          description: 'Log script output',
          example: 'Redirects both stdout and stderr to log file'
        },
        {
          title: 'Cleanup',
          code: 'trap "rm -f $temp_file" EXIT\ntemp_file=$(mktemp)',
          description: 'Clean up resources on script exit',
          example: 'trap ensures cleanup even on script failure'
        }
      ]
    }
  ]
}