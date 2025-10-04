import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CommandLineIcon } from '@heroicons/react/24/outline'

export const powershellCheatSheet: CheatSheetDefinition = {
  id: 'powershell',
  title: 'PowerShell',
  description: 'Essential PowerShell cmdlets, scripting syntax, and system administration commands',
  category: 'System',
  tags: ['powershell', 'windows', 'scripting', 'automation', 'cmdlets', 'system-admin'],
  lastUpdated: '2025-10-04',
  icon: createElement(CommandLineIcon),
  sections: [
    {
      title: 'Basic Commands',
      items: [
        {
          title: 'Get Help',
          code: 'Get-Help <cmdlet>',
          description: 'Display help for any cmdlet',
          example: 'Get-Help Get-Process -Examples'
        },
        {
          title: 'List Available Cmdlets',
          code: 'Get-Command',
          description: 'Show all available cmdlets',
          example: 'Get-Command *Process* (search for process-related cmdlets)'
        },
        {
          title: 'Get Current Location',
          code: 'Get-Location',
          description: 'Show current directory (similar to pwd)',
          example: 'gl (alias)'
        },
        {
          title: 'Change Directory',
          code: 'Set-Location <path>',
          description: 'Change to specified directory',
          example: 'cd C:\\Users (alias)'
        },
        {
          title: 'List Directory Contents',
          code: 'Get-ChildItem',
          description: 'List files and folders',
          example: 'ls, dir, gci (aliases)'
        },
        {
          title: 'Clear Screen',
          code: 'Clear-Host',
          description: 'Clear the console screen',
          example: 'cls, clear (aliases)'
        },
        {
          title: 'Show PowerShell Version',
          code: '$PSVersionTable',
          description: 'Display PowerShell version information'
        }
      ]
    },
    {
      title: 'File & Directory Operations',
      items: [
        {
          title: 'Create Directory',
          code: 'New-Item -ItemType Directory -Path <path>',
          description: 'Create new directory',
          example: 'mkdir C:\\NewFolder (alias)'
        },
        {
          title: 'Create File',
          code: 'New-Item -ItemType File -Path <path>',
          description: 'Create new empty file',
          example: 'ni test.txt (alias)'
        },
        {
          title: 'Copy Files',
          code: 'Copy-Item <source> <destination>',
          description: 'Copy files or directories',
          example: 'cp file.txt backup.txt (alias)'
        },
        {
          title: 'Move/Rename Files',
          code: 'Move-Item <source> <destination>',
          description: 'Move or rename files/directories',
          example: 'mv old.txt new.txt (alias)'
        },
        {
          title: 'Remove Files',
          code: 'Remove-Item <path>',
          description: 'Delete files or directories',
          example: 'rm file.txt, del file.txt (aliases)'
        },
        {
          title: 'Read File Content',
          code: 'Get-Content <file>',
          description: 'Display file contents',
          example: 'cat file.txt, type file.txt (aliases)'
        },
        {
          title: 'Write to File',
          code: 'Set-Content <file> -Value "text"',
          description: 'Write text to file (overwrites)',
          example: '"Hello World" | Out-File test.txt'
        },
        {
          title: 'Append to File',
          code: 'Add-Content <file> -Value "text"',
          description: 'Append text to existing file'
        }
      ]
    },
    {
      title: 'Process Management',
      items: [
        {
          title: 'List Running Processes',
          code: 'Get-Process',
          description: 'Show all running processes',
          example: 'ps (alias), Get-Process *chrome*'
        },
        {
          title: 'Start Process',
          code: 'Start-Process <program>',
          description: 'Launch a program or application',
          example: 'Start-Process notepad'
        },
        {
          title: 'Stop Process',
          code: 'Stop-Process -Name <name>',
          description: 'Terminate process by name',
          example: 'Stop-Process -Name notepad'
        },
        {
          title: 'Stop Process by ID',
          code: 'Stop-Process -Id <id>',
          description: 'Terminate process by process ID',
          example: 'kill 1234 (alias)'
        },
        {
          title: 'Get Process Details',
          code: 'Get-Process | Where-Object {$_.CPU -gt 100}',
          description: 'Filter processes by criteria',
          example: 'Find processes using high CPU'
        }
      ]
    },
    {
      title: 'System Information',
      items: [
        {
          title: 'Computer Information',
          code: 'Get-ComputerInfo',
          description: 'Display comprehensive system information'
        },
        {
          title: 'System Services',
          code: 'Get-Service',
          description: 'List all Windows services and their status',
          example: 'Get-Service *audio* (search services)'
        },
        {
          title: 'Environment Variables',
          code: 'Get-ChildItem Env:',
          description: 'Display all environment variables',
          example: '$env:PATH (specific variable)'
        },
        {
          title: 'Disk Space',
          code: 'Get-WmiObject -Class Win32_LogicalDisk',
          description: 'Show disk space information',
          example: 'Get-PSDrive -PSProvider FileSystem'
        },
        {
          title: 'Network Configuration',
          code: 'Get-NetIPConfiguration',
          description: 'Display network adapter information'
        },
        {
          title: 'Installed Programs',
          code: 'Get-WmiObject -Class Win32_Product',
          description: 'List installed software (slow)',
          example: 'Get-ItemProperty HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'
        },
        {
          title: 'System Uptime',
          code: '(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime',
          description: 'Calculate system uptime'
        }
      ]
    },
    {
      title: 'Variables & Data Types',
      items: [
        {
          title: 'Create Variable',
          code: '$myVar = "Hello World"',
          description: 'Assign value to variable',
          example: 'Variables start with $ symbol'
        },
        {
          title: 'Variable Types',
          code: '[int]$number = 42',
          description: 'Specify variable type',
          example: '[string], [int], [datetime], [array]'
        },
        {
          title: 'Arrays',
          code: '$array = @("item1", "item2", "item3")',
          description: 'Create array of items',
          example: '$array[0] (access first element)'
        },
        {
          title: 'Hash Tables',
          code: '$hash = @{Name="John"; Age=30}',
          description: 'Create key-value pairs',
          example: '$hash.Name, $hash["Age"]'
        },
        {
          title: 'Check Variable Type',
          code: '$var.GetType()',
          description: 'Display variable type information'
        },
        {
          title: 'Remove Variable',
          code: 'Remove-Variable -Name myVar',
          description: 'Delete variable from memory'
        }
      ]
    },
    {
      title: 'Control Flow & Logic',
      items: [
        {
          title: 'If Statement',
          code: 'if ($condition) { "True" } else { "False" }',
          description: 'Conditional execution',
          example: 'if ($var -eq "test") { Write-Host "Match" }'
        },
        {
          title: 'Switch Statement',
          code: 'switch ($var) { "A" {"Letter A"}; "B" {"Letter B"}; default {"Other"} }',
          description: 'Multiple condition matching'
        },
        {
          title: 'For Loop',
          code: 'for ($i=1; $i -le 10; $i++) { Write-Host $i }',
          description: 'Iterate with counter'
        },
        {
          title: 'ForEach Loop',
          code: 'foreach ($item in $array) { Write-Host $item }',
          description: 'Iterate through collection'
        },
        {
          title: 'While Loop',
          code: 'while ($condition) { # code }',
          description: 'Repeat while condition is true'
        },
        {
          title: 'Comparison Operators',
          code: '-eq (equal), -ne (not equal), -lt (less than), -gt (greater than)',
          description: 'Common comparison operators',
          example: '-like (wildcard), -match (regex)'
        }
      ]
    },
    {
      title: 'Functions & Scripts',
      items: [
        {
          title: 'Define Function',
          code: 'function Get-Square($number) { return $number * $number }',
          description: 'Create reusable function',
          example: 'Get-Square 5'
        },
        {
          title: 'Advanced Function',
          code: 'function Get-Info { [CmdletBinding()] param([Parameter(Mandatory)]$Name) }',
          description: 'Function with parameters and help'
        },
        {
          title: 'Run Script',
          code: '.\\script.ps1',
          description: 'Execute PowerShell script file',
          example: 'Use .\ for current directory'
        },
        {
          title: 'Script Parameters',
          code: 'param([string]$Name, [int]$Age)',
          description: 'Define script parameters',
          example: 'Place at top of script file'
        },
        {
          title: 'Execution Policy',
          code: 'Set-ExecutionPolicy RemoteSigned',
          description: 'Allow script execution',
          example: 'Get-ExecutionPolicy (check current policy)'
        },
        {
          title: 'Import Module',
          code: 'Import-Module <module>',
          description: 'Load PowerShell module',
          example: 'Import-Module ActiveDirectory'
        }
      ]
    },
    {
      title: 'Pipeline & Filtering',
      items: [
        {
          title: 'Pipe Output',
          code: 'Get-Process | Where-Object {$_.CPU -gt 100}',
          description: 'Pass output to next command',
          example: 'Filter processes by CPU usage'
        },
        {
          title: 'Select Properties',
          code: 'Get-Process | Select-Object Name, CPU',
          description: 'Choose specific properties to display'
        },
        {
          title: 'Sort Results',
          code: 'Get-Process | Sort-Object CPU -Descending',
          description: 'Sort output by property'
        },
        {
          title: 'Group Results',
          code: 'Get-Process | Group-Object ProcessName',
          description: 'Group objects by property'
        },
        {
          title: 'Measure Objects',
          code: 'Get-Process | Measure-Object',
          description: 'Count objects or calculate statistics',
          example: 'Measure-Object -Property CPU -Sum'
        },
        {
          title: 'ForEach-Object',
          code: 'Get-Process | ForEach-Object { $_.Name.ToUpper() }',
          description: 'Perform action on each object',
          example: '% { } (alias)'
        },
        {
          title: 'Tee-Object',
          code: 'Get-Process | Tee-Object -FilePath processes.txt | Select Name',
          description: 'Save output to file and continue pipeline'
        }
      ]
    },
    {
      title: 'Text Processing',
      items: [
        {
          title: 'String Methods',
          code: '"Hello World".ToLower()',
          description: 'Built-in string methods',
          example: '.ToUpper(), .Substring(), .Replace()'
        },
        {
          title: 'String Formatting',
          code: '"Hello {0}, you are {1} years old" -f $name, $age',
          description: 'Format strings with placeholders'
        },
        {
          title: 'Regular Expressions',
          code: '"test123" -match "\\d+"',
          description: 'Pattern matching with regex',
          example: '"test123" -replace "\\d+", "456"'
        },
        {
          title: 'Split String',
          code: '"one,two,three".Split(",")',
          description: 'Split string into array'
        },
        {
          title: 'Join Array',
          code: '("one","two","three") -join ","',
          description: 'Join array elements into string'
        },
        {
          title: 'Select-String',
          code: 'Select-String -Pattern "error" -Path *.log',
          description: 'Search for text in files (like grep)',
          example: 'Get-Content file.txt | Select-String "pattern"'
        }
      ]
    },
    {
      title: 'Remote Management',
      items: [
        {
          title: 'Enable PSRemoting',
          code: 'Enable-PSRemoting -Force',
          description: 'Enable PowerShell remoting on computer'
        },
        {
          title: 'Create Session',
          code: '$session = New-PSSession -ComputerName <computer>',
          description: 'Create remote session'
        },
        {
          title: 'Invoke Command',
          code: 'Invoke-Command -ComputerName <computer> -ScriptBlock { Get-Process }',
          description: 'Run command on remote computer'
        },
        {
          title: 'Enter Remote Session',
          code: 'Enter-PSSession -ComputerName <computer>',
          description: 'Interactive remote session'
        },
        {
          title: 'Copy Files to Remote',
          code: 'Copy-Item -Path <local> -Destination <remote> -ToSession $session',
          description: 'Copy files to remote computer'
        },
        {
          title: 'Run Script Remotely',
          code: 'Invoke-Command -FilePath script.ps1 -ComputerName <computer>',
          description: 'Execute local script on remote machine'
        }
      ]
    },
    {
      title: 'Tips & Best Practices',
      items: [
        {
          title: 'Tab Completion',
          description: 'Use Tab key for cmdlet and parameter completion',
          example: 'Type "Get-Proc" then Tab to complete'
        },
        {
          title: 'Command History',
          code: 'Get-History',
          description: 'View command history',
          example: 'Use Up/Down arrows or F7 for history'
        },
        {
          title: 'ISE vs Console',
          description: 'PowerShell ISE provides GUI scripting environment',
          example: 'VS Code with PowerShell extension is modern alternative'
        },
        {
          title: 'Whatif Parameter',
          code: 'Remove-Item *.txt -WhatIf',
          description: 'Preview what command would do without executing',
          example: 'Safety feature for destructive operations'
        },
        {
          title: 'Verbose Output',
          code: 'Get-Process -Verbose',
          description: 'Show detailed operation information'
        },
        {
          title: 'Error Handling',
          code: 'try { # code } catch { Write-Error $_.Exception.Message }',
          description: 'Handle errors gracefully in scripts'
        },
        {
          title: 'Profile Script',
          code: '$PROFILE',
          description: 'Path to PowerShell profile for customization',
          example: 'Auto-loads when PowerShell starts'
        }
      ]
    }
  ]
}