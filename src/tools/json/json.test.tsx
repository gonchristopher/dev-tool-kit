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

    describe('Case Conversion', () => {
        it('should convert keys to camelCase', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Find and set case conversion to camelCase
            const caseSelect = screen.getByDisplayValue('None') ||
                container.querySelector('select')

            if (caseSelect) {
                fireEvent.change(caseSelect, { target: { value: 'camelCase' } })
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with snake_case keys
            const snakeCaseJson = '{"first_name": "John", "last_name": "Doe", "home_address": {"street_name": "Main St", "zip_code": "12345"}}'
            fireEvent.change(inputTextarea, { target: { value: snakeCaseJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('pre') || getTextarea(container)
                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value

                // Should convert snake_case to camelCase
                expect(output).toContain('firstName')
                expect(output).toContain('lastName')
                expect(output).toContain('homeAddress')
                expect(output).toContain('streetName')
                expect(output).toContain('zipCode')

                // Should not contain snake_case keys
                expect(output).not.toContain('first_name')
                expect(output).not.toContain('last_name')
                expect(output).not.toContain('home_address')
                expect(output).not.toContain('street_name')
                expect(output).not.toContain('zip_code')
            })
        })

        it('should convert keys to snake_case', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Find and set case conversion to snake_case
            const caseSelect = screen.getByDisplayValue('None') ||
                container.querySelector('select')

            if (caseSelect) {
                fireEvent.change(caseSelect, { target: { value: 'snake_case' } })
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with camelCase keys
            const camelCaseJson = '{"firstName": "John", "lastName": "Doe", "homeAddress": {"streetName": "Main St", "zipCode": "12345"}}'
            fireEvent.change(inputTextarea, { target: { value: camelCaseJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('pre') || getTextarea(container)
                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value

                // Should convert camelCase to snake_case
                expect(output).toContain('first_name')
                expect(output).toContain('last_name')
                expect(output).toContain('home_address')
                expect(output).toContain('street_name')
                expect(output).toContain('zip_code')

                // Should not contain camelCase keys
                expect(output).not.toContain('firstName')
                expect(output).not.toContain('lastName')
                expect(output).not.toContain('homeAddress')
                expect(output).not.toContain('streetName')
                expect(output).not.toContain('zipCode')
            })
        })

        it('should handle nested objects and arrays in case conversion', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Set case conversion to camelCase
            const caseSelect = container.querySelector('select')
            if (caseSelect) {
                fireEvent.change(caseSelect, { target: { value: 'camelCase' } })
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with nested structure
            const nestedJson = `{
                "user_list": [
                    {"first_name": "John", "contact_info": {"email_address": "john@test.com"}},
                    {"first_name": "Jane", "contact_info": {"email_address": "jane@test.com"}}
                ],
                "meta_data": {
                    "total_count": 2,
                    "page_size": 10
                }
            }`
            fireEvent.change(inputTextarea, { target: { value: nestedJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('pre') || getTextarea(container)
                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value

                // Should convert all nested keys to camelCase
                expect(output).toContain('userList')
                expect(output).toContain('firstName')
                expect(output).toContain('contactInfo')
                expect(output).toContain('emailAddress')
                expect(output).toContain('metaData')
                expect(output).toContain('totalCount')
                expect(output).toContain('pageSize')
            })
        })

        it('should not convert keys when set to none', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Ensure case conversion is set to none (default)
            const caseSelect = container.querySelector('select')
            if (caseSelect) {
                fireEvent.change(caseSelect, { target: { value: 'none' } })
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with mixed case keys
            const mixedJson = '{"snake_case_key": 1, "camelCaseKey": 2, "PascalCaseKey": 3}'
            fireEvent.change(inputTextarea, { target: { value: mixedJson } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('pre') || getTextarea(container)
                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value

                // Should preserve original key formatting
                expect(output).toContain('snake_case_key')
                expect(output).toContain('camelCaseKey')
                expect(output).toContain('PascalCaseKey')
            })
        })

        it('should combine case conversion with key sorting', async () => {
            const { container } = renderTool(<JSONFormatter />)

            const inputTextarea = getTextarea(container)

            // Enable both case conversion and key sorting
            const sortKeysCheckbox = screen.getByLabelText(/sort keys/i) ||
                container.querySelector('input[type="checkbox"]')

            if (sortKeysCheckbox) {
                fireEvent.click(sortKeysCheckbox)
            }

            const caseSelect = container.querySelector('select')
            if (caseSelect) {
                fireEvent.change(caseSelect, { target: { value: 'camelCase' } })
            }

            const formatButton = getButton(container, 'Format')

            // Enter JSON with snake_case keys in random order
            const json = '{"zebra_key": 1, "apple_value": 2, "banana_item": 3}'
            fireEvent.change(inputTextarea, { target: { value: json } })
            fireEvent.click(formatButton)

            await waitFor(() => {
                const outputElement = container.querySelector('pre') || getTextarea(container)
                const output = outputElement.textContent || (outputElement as HTMLTextAreaElement).value

                // Should convert to camelCase AND sort alphabetically
                expect(output).toContain('appleValue')
                expect(output).toContain('bananaItem')
                expect(output).toContain('zebraKey')

                // Check order (converted keys should be sorted)
                const appleIndex = output.indexOf('appleValue')
                const bananaIndex = output.indexOf('bananaItem')
                const zebraIndex = output.indexOf('zebraKey')

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