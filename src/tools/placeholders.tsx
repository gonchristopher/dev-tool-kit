import type { ToolDefinition } from '@/types'

function PlaceholderTool({ title }: { title: string }) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          This tool is coming soon!
        </p>
      </div>
    </div>
  )
}

export const urlTool: ToolDefinition = {
  id: 'url',
  title: 'URL Encoder/Decoder',
  description: 'Encode and decode URLs and query parameters',
  keywords: ['url', 'encode', 'decode', 'query', 'parameters'],
  element: () => <PlaceholderTool title="URL Encoder/Decoder" />,
}



export const timestampTool: ToolDefinition = {
  id: 'timestamp',
  title: 'Timestamp Converter',
  description: 'Convert between UNIX timestamps and human-readable dates',
  keywords: ['timestamp', 'unix', 'date', 'time', 'converter'],
  element: () => <PlaceholderTool title="Timestamp Converter" />,
}

export const jwtTool: ToolDefinition = {
  id: 'jwt',
  title: 'JWT Decoder',
  description: 'Decode JWT tokens to inspect header and payload',
  keywords: ['jwt', 'json', 'web', 'token', 'decode'],
  element: () => <PlaceholderTool title="JWT Decoder" />,
}

export const regexTool: ToolDefinition = {
  id: 'regex',
  title: 'Regex Tester',
  description: 'Test regular expressions with live matching and groups',
  keywords: ['regex', 'regexp', 'pattern', 'match', 'test'],
  element: () => <PlaceholderTool title="Regex Tester" />,
}

export const diffTool: ToolDefinition = {
  id: 'diff',
  title: 'Text Diff',
  description: 'Compare two texts and highlight differences',
  keywords: ['diff', 'compare', 'text', 'differences', 'changes'],
  element: () => <PlaceholderTool title="Text Diff" />,
}

