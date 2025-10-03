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







