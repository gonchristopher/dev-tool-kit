import { Alert, Button, CodeTextarea } from '@/components'
import type { ToolDefinition } from '@/types'
import { diffWorker } from '@/workers'
import { AdjustmentsHorizontalIcon, ArrowsRightLeftIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import type { Change } from 'diff'
/* eslint-disable react-refresh/only-export-components */
import { useState, useCallback, useMemo } from 'react'

type DiffLine = { content: string; type: 'normal' | 'removed' | 'added' | 'empty' }

interface DiffResult {
  lineDiff: Change[]
  charDiff: Change[]
  stats: {
    linesAdded: number
    linesRemoved: number
    linesUnchanged: number
  }
}

type DiffMode = 'side-by-side' | 'unified'
type DiffLevel = 'line' | 'char'

function TextDiff() {
  const [originalText, setOriginalText] = useState('')
  const [modifiedText, setModifiedText] = useState('')
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [diffMode, setDiffMode] = useState<DiffMode>('side-by-side')
  const [diffLevel, setDiffLevel] = useState<DiffLevel>('line')

  const performDiff = useCallback(async () => {
    if (!originalText && !modifiedText) {
      setError('Please enter text in at least one of the fields')
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const response = await diffWorker.compare(originalText, modifiedText)

      if (response.type === 'diff-result') {
        setDiffResult(response.payload as DiffResult)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to compare texts'
      setError(message)
    } finally {
      setIsProcessing(false)
    }
  }, [originalText, modifiedText])

  const swapTexts = useCallback(() => {
    const temp = originalText
    setOriginalText(modifiedText)
    setModifiedText(temp)

    // If we have a diff result, swap the added/removed stats
    if (diffResult) {
      const newStats = {
        linesAdded: diffResult.stats.linesRemoved,
        linesRemoved: diffResult.stats.linesAdded,
        linesUnchanged: diffResult.stats.linesUnchanged
      }
      setDiffResult({
        ...diffResult,
        stats: newStats
      })
    }
  }, [originalText, modifiedText, diffResult])

  const clearAll = useCallback(() => {
    setOriginalText('')
    setModifiedText('')
    setDiffResult(null)
    setError(null)
  }, [])

  const downloadDiff = useCallback(() => {
    if (!diffResult) return

    const changes = diffLevel === 'line' ? diffResult.lineDiff : diffResult.charDiff
    let content = `Text Diff Report\n`
    content += `Generated: ${new Date().toISOString()}\n`
    content += `Mode: ${diffLevel === 'line' ? 'Line-by-line' : 'Character-by-character'}\n\n`

    if (diffResult.stats) {
      content += `Statistics:\n`
      content += `- Lines added: ${diffResult.stats.linesAdded}\n`
      content += `- Lines removed: ${diffResult.stats.linesRemoved}\n`
      content += `- Lines unchanged: ${diffResult.stats.linesUnchanged}\n\n`
    }

    content += `Diff:\n`
    content += `${'='.repeat(50)}\n`

    changes.forEach((part, index) => {
      const prefix = part.added ? '+ ' : part.removed ? '- ' : '  '
      const lines = part.value.split('\n').filter(line => line || index === changes.length - 1)
      lines.forEach(line => {
        if (line || part.value.endsWith('\n')) {
          content += `${prefix}${line}\n`
        }
      })
    })

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `text-diff-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }, [diffResult, diffLevel])

  const loadExample = useCallback(() => {
    const original = `Hello World!
This is line 2.
This line will be modified.
This line will be removed.
Shared line here.`

    const modified = `Hello World!
This is line 2.
This line has been modified!
Shared line here.
This is a new line at the end.`

    setOriginalText(original)
    setModifiedText(modified)
  }, [])

  // Process diff for display
  const processedDiff = useMemo(() => {
    if (!diffResult) return null

    const changes = diffLevel === 'line' ? diffResult.lineDiff : diffResult.charDiff

    if (diffMode === 'unified') {
      return { unified: changes }
    } else {
      // Side-by-side processing
      const leftLines: Array<{ content: string; type: 'normal' | 'removed' | 'empty' }> = []
      const rightLines: Array<{ content: string; type: 'normal' | 'added' | 'empty' }> = []

      changes.forEach(part => {
        const lines = part.value.split('\n').filter((line, index, arr) =>
          line || (index === arr.length - 1 && part.value.endsWith('\n'))
        )

        if (part.added) {
          lines.forEach(line => {
            leftLines.push({ content: '', type: 'empty' })
            rightLines.push({ content: line, type: 'added' })
          })
        } else if (part.removed) {
          lines.forEach(line => {
            leftLines.push({ content: line, type: 'removed' })
            rightLines.push({ content: '', type: 'empty' })
          })
        } else {
          lines.forEach(line => {
            leftLines.push({ content: line, type: 'normal' })
            rightLines.push({ content: line, type: 'normal' })
          })
        }
      })

      return { leftLines, rightLines }
    }
  }, [diffResult, diffMode, diffLevel])

  const renderUnifiedDiff = (changes: Change[]) => (
    <div className="font-mono text-sm overflow-x-auto">
      {changes.map((part, index) => {
        const lines = part.value.split('\n').filter((line, idx, arr) =>
          line || (idx === arr.length - 1 && part.value.endsWith('\n'))
        )

        return lines.map((line, lineIndex) => (
          <div
            key={`${index}-${lineIndex}`}
            className={`px-3 py-1 ${part.added
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                : part.removed
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
              }`}
          >
            <span className="text-gray-400 dark:text-gray-500 mr-2 select-none">
              {part.added ? '+' : part.removed ? '-' : ' '}
            </span>
            {line || '\u00A0'}
          </div>
        ))
      })}
    </div>
  )

  const renderSideBySide = (leftLines: DiffLine[], rightLines: DiffLine[]) => (
    <div className="grid grid-cols-2 gap-1 text-sm font-mono">
      {/* Left side - Original */}
      <div className="border-r border-gray-200 dark:border-gray-700">
        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-300 font-semibold">
          Original
        </div>
        <div className="overflow-x-auto">
          {leftLines.map((line, index) => (
            <div
              key={index}
              className={`px-3 py-1 ${line.type === 'removed'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                  : line.type === 'empty'
                    ? 'bg-gray-50 dark:bg-gray-800/50'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                }`}
            >
              <span className="text-gray-400 dark:text-gray-500 mr-2 select-none">
                {line.type === 'empty' ? ' ' : index + 1}
              </span>
              {line.content || '\u00A0'}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Modified */}
      <div>
        <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-gray-700 dark:text-gray-300 font-semibold">
          Modified
        </div>
        <div className="overflow-x-auto">
          {rightLines.map((line, index) => (
            <div
              key={index}
              className={`px-3 py-1 ${line.type === 'added'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                  : line.type === 'empty'
                    ? 'bg-gray-50 dark:bg-gray-800/50'
                    : 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                }`}
            >
              <span className="text-gray-400 dark:text-gray-500 mr-2 select-none">
                {line.type === 'empty' ? ' ' : index + 1}
              </span>
              {line.content || '\u00A0'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Text Diff Tool
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Compare two texts and highlight their differences side-by-side or in unified format.
          Supports both line-level and character-level comparisons.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <Button onClick={loadExample} variant="outline" size="sm">
          Load Example
        </Button>
        <Button onClick={swapTexts} variant="outline" size="sm" className="flex items-center space-x-1">
          <ArrowsRightLeftIcon className="h-4 w-4" />
          <span>Swap</span>
        </Button>
        <Button onClick={clearAll} variant="outline" size="sm">
          Clear All
        </Button>

        <div className="flex items-center space-x-2">
          <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <select
            value={diffLevel}
            onChange={(e) => setDiffLevel(e.target.value as DiffLevel)}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="line">Line-by-line</option>
            <option value="char">Character-by-character</option>
          </select>

          <select
            value={diffMode}
            onChange={(e) => setDiffMode(e.target.value as DiffMode)}
            className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="side-by-side">Side by side</option>
            <option value="unified">Unified</option>
          </select>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Original Text
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {originalText.length.toLocaleString()} characters
            </div>
          </div>
          <CodeTextarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Enter the original text..."
            rows={10}
            language="text"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Modified Text
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {modifiedText.length.toLocaleString()} characters
            </div>
          </div>
          <CodeTextarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            placeholder="Enter the modified text..."
            rows={10}
            language="text"
          />
        </div>
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <Button
          onClick={performDiff}
          disabled={(!originalText && !modifiedText) || isProcessing}
          isLoading={isProcessing}
          size="lg"
        >
          Compare Texts
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="error">
          {error}
        </Alert>
      )}

      {/* Results */}
      {diffResult && processedDiff && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Comparison Results
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={downloadDiff}
                className="flex items-center space-x-1"
              >
                <DocumentArrowDownIcon className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                +{diffResult.stats.linesAdded}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Added</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                -{diffResult.stats.linesRemoved}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Removed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {diffResult.stats.linesUnchanged}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Unchanged</div>
            </div>
          </div>

          {/* Diff Display */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {diffMode === 'unified' && 'unified' in processedDiff && processedDiff.unified ? (
              renderUnifiedDiff(processedDiff.unified)
            ) : 'leftLines' in processedDiff && 'rightLines' in processedDiff && processedDiff.leftLines && processedDiff.rightLines ? (
              renderSideBySide(processedDiff.leftLines, processedDiff.rightLines)
            ) : null}
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Tips
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• <strong>Line-by-line:</strong> Better for comparing documents, code, or structured text</li>
          <li>• <strong>Character-by-character:</strong> More granular, useful for finding small changes within lines</li>
          <li>• <strong>Side-by-side:</strong> Easy to read format showing original and modified side by side</li>
          <li>• <strong>Unified:</strong> Compact format similar to Git diffs, showing changes inline</li>
          <li>• Green highlighting indicates additions, red indicates removals</li>
          <li>• Use "Swap" to reverse which text is considered original vs modified</li>
        </ul>
      </div>
    </div>
  )
}

export const diffTool: ToolDefinition = {
  id: 'diff',
  title: 'Text Diff',
  description: 'Compare two texts and highlight differences with side-by-side or unified views',
  element: TextDiff,
  keywords: ['diff', 'compare', 'text', 'differences', 'changes', 'side-by-side', 'unified'],
  seo: {
    title: 'Text Diff Tool - Compare Text Online',
    description: 'Compare two texts and highlight their differences online. Side-by-side and unified views available. Free text comparison tool.',
  },
}