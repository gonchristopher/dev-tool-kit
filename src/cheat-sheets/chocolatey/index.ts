import type { CheatSheetDefinition } from '@/types'
import { createElement } from 'react'
import { CubeTransparentIcon } from '@heroicons/react/24/outline'

export const chocolateyCheatSheet: CheatSheetDefinition = {
  id: 'chocolatey',
  title: 'Chocolatey Package Manager',
  description: 'Windows package manager commands for installing, managing, and maintaining software',
  category: 'System',
  tags: ['chocolatey', 'choco', 'windows', 'package-manager', 'installer', 'powershell'],
  lastUpdated: '2025-10-04',
  icon: createElement(CubeTransparentIcon),
  sections: [
    {
      title: 'Installation & Setup',
      items: [
        {
          title: 'Install Chocolatey',
          code: 'Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString(\'https://community.chocolatey.org/install.ps1\'))',
          description: 'Install Chocolatey on Windows (run as Administrator)',
          example: 'Run in PowerShell as Administrator'
        },
        {
          title: 'Check Version',
          code: 'choco --version',
          description: 'Display Chocolatey version'
        },
        {
          title: 'Update Chocolatey',
          code: 'choco upgrade chocolatey',
          description: 'Update Chocolatey to latest version'
        },
        {
          title: 'Help',
          code: 'choco --help',
          description: 'Show help and available commands',
          example: 'choco <command> --help for command-specific help'
        },
        {
          title: 'Configuration',
          code: 'choco config list',
          description: 'Show current configuration settings'
        }
      ]
    },
    {
      title: 'Package Installation',
      items: [
        {
          title: 'Install Package',
          code: 'choco install <package>',
          description: 'Install a package',
          example: 'choco install googlechrome'
        },
        {
          title: 'Install Multiple Packages',
          code: 'choco install <package1> <package2>',
          description: 'Install multiple packages at once',
          example: 'choco install git nodejs vscode'
        },
        {
          title: 'Install with Auto-Confirm',
          code: 'choco install <package> -y',
          description: 'Install package without confirmation prompts',
          example: 'Useful for automation and scripts'
        },
        {
          title: 'Install Specific Version',
          code: 'choco install <package> --version=<version>',
          description: 'Install specific package version',
          example: 'choco install nodejs --version=16.14.0'
        },
        {
          title: 'Install from File',
          code: 'choco install packages.config',
          description: 'Install packages from config file',
          example: 'XML file listing packages and versions'
        },
        {
          title: 'Force Reinstall',
          code: 'choco install <package> --force',
          description: 'Force reinstallation of package'
        },
        {
          title: 'Install Pre-release',
          code: 'choco install <package> --pre',
          description: 'Install pre-release/beta version'
        }
      ]
    },
    {
      title: 'Package Management',
      items: [
        {
          title: 'List Installed Packages',
          code: 'choco list --local-only',
          description: 'Show all locally installed packages',
          example: 'choco list -lo (shorthand)'
        },
        {
          title: 'Search Packages',
          code: 'choco search <keyword>',
          description: 'Search for packages by keyword',
          example: 'choco search editor'
        },
        {
          title: 'Package Information',
          code: 'choco info <package>',
          description: 'Show detailed package information',
          example: 'Shows description, version, dependencies'
        },
        {
          title: 'Check Outdated Packages',
          code: 'choco outdated',
          description: 'List packages that have updates available'
        },
        {
          title: 'Update Package',
          code: 'choco upgrade <package>',
          description: 'Update specific package to latest version',
          example: 'choco upgrade googlechrome'
        },
        {
          title: 'Update All Packages',
          code: 'choco upgrade all',
          description: 'Update all installed packages',
          example: 'choco upgrade all -y (with auto-confirm)'
        },
        {
          title: 'Uninstall Package',
          code: 'choco uninstall <package>',
          description: 'Remove installed package',
          example: 'choco uninstall googlechrome'
        }
      ]
    },
    {
      title: 'Package Sources',
      items: [
        {
          title: 'List Sources',
          code: 'choco source list',
          description: 'Show configured package sources/repositories'
        },
        {
          title: 'Add Source',
          code: 'choco source add -n=<name> -s=<url>',
          description: 'Add new package source',
          example: 'choco source add -n=myrepo -s=https://myrepo.com/api/v2'
        },
        {
          title: 'Remove Source',
          code: 'choco source remove -n=<name>',
          description: 'Remove package source'
        },
        {
          title: 'Enable/Disable Source',
          code: 'choco source enable/disable -n=<name>',
          description: 'Enable or disable package source',
          example: 'Useful for temporarily disabling sources'
        },
        {
          title: 'Install from Specific Source',
          code: 'choco install <package> -s <source>',
          description: 'Install package from specific source',
          example: 'choco install myapp -s myrepo'
        }
      ]
    },
    {
      title: 'Advanced Features',
      items: [
        {
          title: 'Pin Package',
          code: 'choco pin add -n=<package>',
          description: 'Prevent package from being updated',
          example: 'Useful for keeping specific versions'
        },
        {
          title: 'Unpin Package',
          code: 'choco pin remove -n=<package>',
          description: 'Allow package to be updated again'
        },
        {
          title: 'List Pinned Packages',
          code: 'choco pin list',
          description: 'Show all pinned packages'
        },
        {
          title: 'Export Package List',
          code: 'choco export packages.config',
          description: 'Export installed packages to config file',
          example: 'Useful for backup and system migration'
        },
        {
          title: 'Sync with Programs and Features',
          code: 'choco sync',
          description: 'Sync Chocolatey database with installed programs',
          example: 'Useful after manual software installation'
        },
        {
          title: 'Install Missing Dependencies',
          code: 'choco install <package> --install-arguments="/quiet"',
          description: 'Pass custom arguments to installer'
        }
      ]
    },
    {
      title: 'Configuration & Settings',
      items: [
        {
          title: 'Set Configuration',
          code: 'choco config set <setting> <value>',
          description: 'Configure Chocolatey settings',
          example: 'choco config set cacheLocation C:\\temp'
        },
        {
          title: 'Unset Configuration',
          code: 'choco config unset <setting>',
          description: 'Remove configuration setting'
        },
        {
          title: 'Enable Feature',
          code: 'choco feature enable -n=<feature>',
          description: 'Enable Chocolatey feature',
          example: 'choco feature enable -n=allowGlobalConfirmation'
        },
        {
          title: 'Disable Feature',
          code: 'choco feature disable -n=<feature>',
          description: 'Disable Chocolatey feature'
        },
        {
          title: 'List Features',
          code: 'choco feature list',
          description: 'Show all available features and their status'
        },
        {
          title: 'Set API Key',
          code: 'choco apikey -k <key> -s <source>',
          description: 'Set API key for package source authentication'
        }
      ]
    },
    {
      title: 'Popular Packages',
      items: [
        {
          title: 'Development Tools',
          code: 'choco install git nodejs vscode',
          description: 'Essential development tools',
          example: 'Git, Node.js, VS Code'
        },
        {
          title: 'Browsers',
          code: 'choco install googlechrome firefox',
          description: 'Popular web browsers',
          example: 'Chrome, Firefox'
        },
        {
          title: 'Media & Utilities',
          code: 'choco install vlc 7zip notepadplusplus',
          description: 'Common utilities and media players',
          example: 'VLC, 7-Zip, Notepad++'
        },
        {
          title: 'System Tools',
          code: 'choco install sysinternals powershell-core',
          description: 'System administration tools',
          example: 'SysInternals Suite, PowerShell Core'
        },
        {
          title: 'Communication',
          code: 'choco install discord slack zoom',
          description: 'Communication and collaboration tools'
        },
        {
          title: 'Package Bundles',
          description: 'Use meta-packages for common setups',
          example: 'webdev, gamedev, office365business'
        }
      ]
    },
    {
      title: 'Chocolatey GUI',
      items: [
        {
          title: 'Install Chocolatey GUI',
          code: 'choco install chocolateygui',
          description: 'Install graphical interface for Chocolatey',
          example: 'Provides Windows app for package management'
        },
        {
          title: 'GUI Features',
          description: 'Browse packages, install/uninstall with clicks',
          example: 'User-friendly alternative to command line'
        },
        {
          title: 'GUI Settings',
          description: 'Configure GUI preferences and behavior',
          example: 'Dark theme, update notifications, default actions'
        }
      ]
    },
    {
      title: 'Business/Pro Features',
      items: [
        {
          title: 'Chocolatey for Business',
          description: 'Commercial license with additional features',
          example: 'Package builder, central management, virus scanning'
        },
        {
          title: 'Package Synchronizer',
          description: 'Sync existing software with Chocolatey packages',
          example: 'Automatically detect and manage installed software'
        },
        {
          title: 'Package Builder',
          description: 'Create Chocolatey packages from existing installers',
          example: 'Convert MSI, EXE installers to .nupkg packages'
        },
        {
          title: 'Central Management',
          description: 'Manage packages across multiple machines',
          example: 'Web dashboard for enterprise deployments'
        },
        {
          title: 'Package Internalizer',
          description: 'Create internal packages from public ones',
          example: 'Download and repackage for offline/secure environments'
        }
      ]
    },
    {
      title: 'Troubleshooting',
      items: [
        {
          title: 'Clear Cache',
          code: 'choco cache clean',
          description: 'Clear Chocolatey download cache',
          example: 'Useful when having download issues'
        },
        {
          title: 'Verbose Output',
          code: 'choco install <package> -v',
          description: 'Show detailed installation output for debugging'
        },
        {
          title: 'Debug Mode',
          code: 'choco install <package> --debug',
          description: 'Enable debug mode with maximum verbosity'
        },
        {
          title: 'Check Permissions',
          description: 'Run PowerShell/Command Prompt as Administrator',
          example: 'Most Chocolatey operations require elevated privileges'
        },
        {
          title: 'Execution Policy',
          code: 'Set-ExecutionPolicy RemoteSigned',
          description: 'Allow PowerShell script execution if blocked',
          example: 'Required for Chocolatey to function properly'
        },
        {
          title: 'Antivirus Conflicts',
          description: 'Add Chocolatey folders to antivirus exclusions',
          example: 'C:\\ProgramData\\chocolatey, C:\\tools'
        },
        {
          title: 'Repair Installation',
          code: 'choco install <package> --force',
          description: 'Force reinstall corrupted package'
        }
      ]
    }
  ]
}