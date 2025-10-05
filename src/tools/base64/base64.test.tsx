import { getButton, getTextarea, renderTool } from '@/test/test-utils'
import { Base64Tool } from '@/tools/base64'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the clipboard API
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve())
    }
})

// Mock URL.createObjectURL for download functionality
Object.assign(URL, {
    createObjectURL: vi.fn(() => 'blob:mock-url'),
    revokeObjectURL: vi.fn()
})

describe('Base64Tool', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('Basic Rendering', () => {
        it('should render the Base64 tool', () => {
            renderTool(<Base64Tool />)

            expect(screen.getByText('Base64 Encoder/Decoder')).toBeInTheDocument()
            expect(screen.getByText(/Encode text and files to Base64/)).toBeInTheDocument()
        })

        it('should have encode and decode buttons', () => {
            const { container } = renderTool(<Base64Tool />)

            expect(getButton(container, 'Encode')).toBeInTheDocument()
            expect(getButton(container, 'Decode')).toBeInTheDocument()
        })

        it('should have text and file tabs', () => {
            renderTool(<Base64Tool />)

            expect(screen.getByRole('tab', { name: /text input/i })).toBeInTheDocument()
            expect(screen.getByRole('tab', { name: /file input/i })).toBeInTheDocument()
        })
    })

    describe('Text Encoding', () => {
        it('should encode plain text to base64', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Input text in the textarea (Text Input tab is active by default)
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Hello World' } })

            // Click encode button
            const encodeButton = getButton(container, 'Encode')
            fireEvent.click(encodeButton)

            await waitFor(() => {
                // Look for output section that appears after encoding
                expect(screen.getByText('Output')).toBeInTheDocument()

                // The output should be in a read-only textarea
                const outputTextareas = container.querySelectorAll('textarea[readonly]')
                expect(outputTextareas.length).toBeGreaterThan(0)

                const outputTextarea = outputTextareas[0] as HTMLTextAreaElement
                expect(outputTextarea.value).toBe('SGVsbG8gV29ybGQ=')
            })
        })

        it('should decode valid base64 to text', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Input valid base64
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'SGVsbG8gV29ybGQ=' } })

            // Click decode button
            const decodeButton = getButton(container, 'Decode')
            fireEvent.click(decodeButton)

            await waitFor(() => {
                // Look for output section
                expect(screen.getByText('Output')).toBeInTheDocument()

                // The output should be in a read-only textarea
                const outputTextareas = container.querySelectorAll('textarea[readonly]')
                expect(outputTextareas.length).toBeGreaterThan(0)

                const outputTextarea = outputTextareas[0] as HTMLTextAreaElement
                expect(outputTextarea.value).toBe('Hello World')
            })
        })

        it('should show error for invalid base64', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Input invalid base64
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Invalid base64!' } })

            // Click decode button
            const decodeButton = getButton(container, 'Decode')
            fireEvent.click(decodeButton)

            await waitFor(() => {
                // Look for the specific error message text, not the general word "invalid"
                expect(screen.getByText('Invalid Base64 format')).toBeInTheDocument()
            })
        })

        it('should handle empty input gracefully', () => {
            const { container } = renderTool(<Base64Tool />)

            const encodeButton = getButton(container, 'Encode')
            const decodeButton = getButton(container, 'Decode')

            // Buttons should be disabled when no input
            expect(encodeButton).toBeDisabled()
            expect(decodeButton).toBeDisabled()
        })
    })

    describe('Tab Switching', () => {
        it('should switch between text and file tabs', async () => {
            renderTool(<Base64Tool />)

            // Text Input tab should be active by default
            const textTab = screen.getByRole('tab', { name: /text input/i })
            const fileTab = screen.getByRole('tab', { name: /file input/i })

            expect(textTab).toHaveAttribute('aria-selected', 'true')
            expect(fileTab).toHaveAttribute('aria-selected', 'false')

            // Click file tab
            fireEvent.click(fileTab)

            await waitFor(() => {
                expect(fileTab).toHaveAttribute('aria-selected', 'true')
                expect(textTab).toHaveAttribute('aria-selected', 'false')
            })
        })
    })

    describe('Copy Functionality', () => {
        it('should copy output to clipboard', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Encode some text to get output
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Test' } })

            const encodeButton = getButton(container, 'Encode')
            fireEvent.click(encodeButton)

            await waitFor(() => {
                expect(screen.getByText('Output')).toBeInTheDocument()
            })

            // Find and click copy button in the output section
            const copyButton = container.querySelector('button[title*="Copy"]') ||
                screen.getByRole('button', { name: /copy/i })

            if (copyButton) {
                fireEvent.click(copyButton)
                expect(navigator.clipboard.writeText).toHaveBeenCalled()
            }
        })
    })

    describe('Download Functionality', () => {
        it('should download encoded result', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Encode some text
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Test' } })

            const encodeButton = getButton(container, 'Encode')
            fireEvent.click(encodeButton)

            await waitFor(() => {
                expect(screen.getByText('Output')).toBeInTheDocument()
            })

            // Find download button
            const downloadButton = screen.getByRole('button', { name: /download/i })
            expect(downloadButton).toBeInTheDocument()

            // Should not crash when clicked
            fireEvent.click(downloadButton)
        })
    })

    describe('Output Display', () => {
        it('should show output statistics', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Encode some text
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Test' } })

            const encodeButton = getButton(container, 'Encode')
            fireEvent.click(encodeButton)

            await waitFor(() => {
                expect(screen.getByText('Output')).toBeInTheDocument()
                // Should show length statistics
                expect(screen.getByText(/Length:/)).toBeInTheDocument()
                expect(screen.getByText(/Size change:/)).toBeInTheDocument()
            })
        })
    })

    describe('Error Handling', () => {
        it('should handle decode errors gracefully', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Input completely invalid base64
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: '!!invalid!!' } })

            const decodeButton = getButton(container, 'Decode')
            fireEvent.click(decodeButton)

            await waitFor(() => {
                // Should show the specific error message text
                expect(screen.getByText('Invalid Base64 format')).toBeInTheDocument()
            })
        })

        it('should clear output when input changes', async () => {
            const { container } = renderTool(<Base64Tool />)

            // Input some text
            const inputTextarea = getTextarea(container)
            fireEvent.change(inputTextarea, { target: { value: 'Test' } })

            // Encode it
            const encodeButton = getButton(container, 'Encode')
            fireEvent.click(encodeButton)

            // Wait for output to appear
            await waitFor(() => {
                expect(screen.getByText('Output')).toBeInTheDocument()
            })

            // Change input - this should clear output according to the component logic
            fireEvent.change(inputTextarea, { target: { value: 'New Text' } })

            // The output should clear since the component has setOutput('') in handleTextChange
            // But let's check the textarea content directly instead of waiting for DOM removal
            const outputTextareas = container.querySelectorAll('textarea[readonly]')
            if (outputTextareas.length > 0) {
                const outputTextarea = outputTextareas[0] as HTMLTextAreaElement
                expect(outputTextarea.value).toBe('')
            }
        })
    })
})