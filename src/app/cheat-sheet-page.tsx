import { useParams, Navigate } from 'react-router-dom'
import { getCheatSheetById } from '@/cheat-sheets/registry'
import { CheatSheetView } from '@/app/cheat-sheet-view'

export function CheatSheetPage() {
  const { cheatSheetId } = useParams()
  
  if (!cheatSheetId) {
    return <Navigate to="/cheat-sheets" replace />
  }

  const cheatSheet = getCheatSheetById(cheatSheetId)
  
  if (!cheatSheet) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Cheat Sheet Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The cheat sheet "{cheatSheetId}" could not be found.
          </p>
          <a
            href="/cheat-sheets"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            ← Back to cheat sheets
          </a>
        </div>
      </div>
    )
  }

  return <CheatSheetView cheatSheet={cheatSheet} />
}