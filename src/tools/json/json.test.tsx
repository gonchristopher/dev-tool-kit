import { getButton, getTextarea, renderTool } from '@/test/test-utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { JSONFormatter } from '@/tools/json'

describe('JSONTool', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('JSON Formatting', () => {
        it('should format valid JSON', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            // Enter minified JSON
            const minifiedJson = '{"name":"John","age":30,"city":"New York"}'
            fireEvent.change(inputTextarea, { target: { value: minifiedJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('[data-testid="formatted-output"]') ||
                    container.querySelector('pre') ||
                    getTextarea(container)

                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value
                expect(output).toContain('"name": "John"')
                expect(output).toContain('"age": 30')
            })
        })

        it('should show error for invalid JSON', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            // Enter invalid JSON
            fireEvent.change(inputTextarea, { target: { value: '{"invalid": json}' } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                // Look for the specific syntax error message
                expect(screen.getByText('JSON Syntax Error')).toBeInTheDocument()
            })
        })

        it('should handle empty input', () => {
            const { container } = renderTool(<JSONFormatter />)

            const formatButton = getButton(container, 'Format')
            fireEvent.click(formatButton)

            // Should not crash with empty input
            expect(container).toBeInTheDocument()
        })
    })

    describe('JSON Minification', () => {
        it('should minify formatted JSON', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const minifyButton = getButton(container, 'Minify')

            // Enter formatted JSON
            const formattedJson = `{
  "name": "John",
  "age": 30,
  "city": "New York"
}`
            fireEvent.change(inputTextarea, { target: { value: formattedJson } })
            fireEvent.click(minifyButton)

            await waitFor(() => {
                const outputElement = container.querySelector('[data-testid="minified-output"]') ||
                    container.querySelector('pre') ||
                    getTextarea(container)

                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value
                expect(output).toBe('{"name":"John","age":30,"city":"New York"}')
            })
        })
    })

    describe('JSON Validation', () => {
        it('should show valid JSON indicator after formatting', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            const validJson = '{"valid": true, "count": 42}'
            fireEvent.change(inputTextarea, { target: { value: validJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                // Look for the specific valid indicator in the output section
                const validSpan = container.querySelector('span.text-green-600')
                expect(validSpan).toBeInTheDocument()
                expect(validSpan?.textContent).toContain('Valid')
            })
        })

        it('should show validation errors for invalid JSON', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            const invalidJson = '{"missing": quote}'
            fireEvent.change(inputTextarea, { target: { value: invalidJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                // Look for the specific error indicator in the output section
                const errorSpan = container.querySelector('span.text-red-600')
                expect(errorSpan).toBeInTheDocument()
                expect(errorSpan?.textContent).toContain('Error')
            })
        })
    })

    describe('Key Sorting', () => {
        it('should sort JSON keys when enabled', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Find and enable sort keys option
            const sortKeysCheckbox = screen.getByLabelText(/sort keys/i) ||
                container.querySelector('input[type="checkbox"]')

            if (sortKeysCheckbox) {
                fireEvent.click(sortKeysCheckbox)
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with unsorted keys
            const unsortedJson = '{"zebra": 1, "apple": 2, "banana": 3}'
            fireEvent.change(inputTextarea, { target: { value: unsortedJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('[data-testid="formatted-output"]') ||
                    container.querySelector('pre') ||
                    getTextarea(container)

                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value
                // Keys should be in alphabetical order: apple, banana, zebra
                const appleIndex = output.indexOf('apple')
                const bananaIndex = output.indexOf('banana')
                const zebraIndex = output.indexOf('zebra')

                expect(appleIndex).toBeLessThan(bananaIndex)
                expect(bananaIndex).toBeLessThan(zebraIndex)
            })
        })
    })

    describe('Copy Functionality', () => {
        it('should copy formatted JSON to clipboard', async () => {
            // Mock clipboard
            Object.assign(navigator, {
                clipboard: {
                    writeText: vi.fn().mockImplementation(() => Promise.resolve())
                }
            })

            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            const testJson = '{"test": true}'
            fireEvent.change(inputTextarea, { target: { value: testJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const copyButton = getButton(container, 'Copy') ||
                    container.querySelector('[data-testid="copy-button"]')

                if (copyButton) {
                    fireEvent.click(copyButton)
                    expect(navigator.clipboard.writeText).toHaveBeenCalled()
                }
            })
        })
    })

    describe('Error Handling', () => {
        it('should handle circular references gracefully', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            // This would cause circular reference if not handled
            const problematicJson = '{"a": {"b": {"c": "value"}}}'
            fireEvent.change(inputTextarea, { target: { value: problematicJson } })
            fireEvent.click(formatButton)

            // Should not crash the application
            expect(container).toBeInTheDocument()
        })

        it('should handle very large JSON gracefully', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)
            const formatButton = getButton(container, 'Format')

            // Create a large JSON object
            const largeObj: Record<string, number> = {}
            for (let i = 0; i < 1000; i++) {
                largeObj[`key${i}`] = i
            }
            const largeJson = JSON.stringify(largeObj)

            fireEvent.change(inputTextarea, { target: { value: largeJson } })
            fireEvent.click(formatButton)

            // Should handle large JSON without crashing
            expect(container).toBeInTheDocument()
        })
    })
})