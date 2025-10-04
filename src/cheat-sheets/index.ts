// Import cheat sheet definitions
import { vscodeCheatSheet } from './vscode/index'
import { visualStudioCheatSheet } from './visual-studio/index'
import { gitCheatSheet } from './git/index'
import { ssmsCheatSheet } from './ssms/index'
import { intellijCheatSheet } from './intellij/index'
import { jiraCheatSheet } from './jira/index'
import { slackCheatSheet } from './slack/index'
import { teamsCheatSheet } from './teams/index'
import { dockerCheatSheet } from './docker/index'
import { notepadPlusCheatSheet } from './notepadplus/index'
import { nodejsCheatSheet } from './nodejs/index'
import { chocolateyCheatSheet } from './chocolatey/index'
import { powershellCheatSheet } from './powershell/index'
import { javascriptCheatSheet } from './javascript/index'
import { bashCheatSheet } from './bash/index'
import { mongodbCheatSheet } from './mongodb/index'
import { csharpCheatSheet } from './csharp/index'

// Register cheat sheets with the registry
import { registerCheatSheet } from './registry'

export function registerCheatSheets() {
  try {
    // Original cheat sheets
    registerCheatSheet(vscodeCheatSheet)
    registerCheatSheet(visualStudioCheatSheet)
    registerCheatSheet(gitCheatSheet)
    registerCheatSheet(ssmsCheatSheet)
    
    // New cheat sheets
    registerCheatSheet(intellijCheatSheet)
    registerCheatSheet(jiraCheatSheet)
    registerCheatSheet(slackCheatSheet)
    registerCheatSheet(teamsCheatSheet)
    registerCheatSheet(dockerCheatSheet)
    registerCheatSheet(notepadPlusCheatSheet)
    registerCheatSheet(nodejsCheatSheet)
    registerCheatSheet(chocolateyCheatSheet)
    registerCheatSheet(powershellCheatSheet)
    registerCheatSheet(javascriptCheatSheet)
    registerCheatSheet(bashCheatSheet)
    registerCheatSheet(mongodbCheatSheet)
    registerCheatSheet(csharpCheatSheet)
  } catch (error) {
    console.error('Error registering cheat sheets:', error)
  }
}

// Export individual cheat sheets if needed
export {
  vscodeCheatSheet,
  visualStudioCheatSheet,
  gitCheatSheet,
  ssmsCheatSheet,
  intellijCheatSheet,
  jiraCheatSheet,
  slackCheatSheet,
  teamsCheatSheet,
  dockerCheatSheet,
  notepadPlusCheatSheet,
  nodejsCheatSheet,
  chocolateyCheatSheet,
  powershellCheatSheet,
  javascriptCheatSheet,
  bashCheatSheet,
  mongodbCheatSheet,
  csharpCheatSheet,
}