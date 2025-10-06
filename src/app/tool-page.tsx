import { getToolById } from '@/plugins/registry'
import type { ToolDefinition } from '@/types'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>()
  const [tool, setTool] = useState<ToolDefinition | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => {
      if (!toolId) {
        setLoading(false)
        return
      }

      const foundTool = getToolById(toolId)
      setTool(foundTool || null)
      setLoading(false)
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [toolId])

  useEffect(() => {
    // Update document title for SEO
    if (tool) {
      const title = tool.seo?.title || `${tool.title} - Developer Utilities`
      document.title = title

      // Update meta description
      if (tool.seo?.description || tool.description) {
        let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement
        if (!metaDescription) {
          metaDescription = document.createElement('meta')
          metaDescription.name = 'description'
          document.head.appendChild(metaDescription)
        }
        metaDescription.content = tool.seo?.description || tool.description
      }
    }

    // Cleanup function to reset title
    return () => {
      document.title = 'Developer Utilities'
    }
  }, [tool])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading tool...</p>
        </div>
      </div>
    )
  }

  if (!tool) {
    return <Navigate to="/" replace />
  }

  const ToolComponent = tool.element

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ToolComponent />
      </div>
    </div>
  )
}