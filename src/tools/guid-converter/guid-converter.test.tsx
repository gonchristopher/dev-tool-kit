import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { guidConverterTool } from './index'

const GuidConverter = guidConverterTool.element

// Mock clipboard API
const mockClipboard = {
    writeText: vi.fn()
}

Object.assign(navigator, {
    clipboard: mockClipboard
})

describe('GuidConverter', () => {
    let originalCrypto: Crypto

    beforeEach(() => {
        vi.clearAllMocks()

        // Store original crypto and mock randomUUID for this test suite only
        originalCrypto = global.crypto
        Object.defineProperty(global, 'crypto', {
            value: {
                ...originalCrypto,
                randomUUID: vi.fn(() => '550e8400-e29b-41d4-a716-446655440000')
            },
            configurable: true
        })
        mockClipboard.writeText.mockResolvedValue(undefined)
    })

    afterEach(() => {
        vi.clearAllTimers()
        // Restore original crypto object
        Object.defineProperty(global, 'crypto', {
            value: originalCrypto,
            configurable: true
        })
    })

    describe('Single Mode - Basic Functionality', () => {
        it('should render initial state correctly', () => {
            render(<GuidConverter />)

            expect(screen.getByText('GUID Converter')).toBeInTheDocument()
            expect(screen.getByText('GUID Input')).toBeInTheDocument()
            expect(screen.getByRole('checkbox')).not.toBeChecked()
        })

        it('should convert standard GUID format', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            await waitFor(() => {
                expect(screen.getByText('Conversion Results')).toBeInTheDocument()
                expect(screen.getByDisplayValue(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)).toBeInTheDocument()
            })
        })

        it('should handle GUID without hyphens', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400e29b41d4a716446655440000' } })

            await waitFor(() => {
                expect(screen.getByText('Conversion Results')).toBeInTheDocument()
            })
        })

        it('should handle GUID with braces', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '{550e8400-e29b-41d4-a716-446655440000}' } })

            await waitFor(() => {
                expect(screen.getByText('Conversion Results')).toBeInTheDocument()
            })
        })

        it('should show error for invalid GUID', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: 'invalid-guid' } })

            await waitFor(() => {
                expect(screen.getByText('Invalid GUID format. Please enter a valid GUID.')).toBeInTheDocument()
            })
        })
    })

    describe('MongoDB Base64 Format Support', () => {
        it('should detect and convert MongoDB Base64 GUID format', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            // MongoDB Base64 format: 22 chars + ==
            fireEvent.change(input, { target: { value: 'zsepo5mfDUiWBErjVkslIw==' } })

            await waitFor(() => {
                expect(screen.getByText('Conversion Results')).toBeInTheDocument()
                // Should produce a valid GUID format
                expect(screen.getByDisplayValue(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/)).toBeInTheDocument()
            })
        })

        it('should reject invalid Base64 format', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: 'invalidBase64Format==' } })

            await waitFor(() => {
                expect(screen.getByText('Invalid GUID format. Please enter a valid GUID.')).toBeInTheDocument()
            })
        })

        it('should handle Base64 decoding errors gracefully', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            // Invalid Base64 that matches pattern but fails decoding
            fireEvent.change(input, { target: { value: '!!!invalidB64chars!!==' } })

            await waitFor(() => {
                expect(screen.getByText('Invalid GUID format. Please enter a valid GUID.')).toBeInTheDocument()
            })
        })

        it('should load MongoDB example correctly', async () => {
            render(<GuidConverter />)

            const mongoButton = screen.getByText('Load MongoDB Example')
            fireEvent.click(mongoButton)

            await waitFor(() => {
                expect(screen.getByDisplayValue('zsepo5mfDUiWBErjVkslIw==')).toBeInTheDocument()
                expect(screen.getByText('Conversion Results')).toBeInTheDocument()
            })
        })
    })

    describe('Bulk Mode Functionality', () => {
        beforeEach(async () => {
            render(<GuidConverter />)

            const bulkToggle = screen.getByRole('checkbox')
            fireEvent.click(bulkToggle)

            await waitFor(() => {
                expect(screen.getByText('GUID List Input')).toBeInTheDocument()
            })
        })

        it('should toggle to bulk mode correctly', () => {
            expect(screen.getByText('GUID List Input')).toBeInTheDocument()
            expect(screen.getByText('Load Example GUIDs')).toBeInTheDocument()
            expect(screen.queryByText('Load Standard Example')).not.toBeInTheDocument()
        })

        it('should process multiple valid GUIDs', async () => {
            const input = screen.getByRole('textbox')
            const guids = '550e8400-e29b-41d4-a716-446655440000, 6ba7b810-9dad-11d1-80b4-00c04fd430c8'
            fireEvent.change(input, { target: { value: guids } })

            await waitFor(() => {
                expect(screen.getByText('Bulk Conversion Results (2 GUIDs)')).toBeInTheDocument()
                expect(screen.getByText('Copy CSV')).toBeInTheDocument()
            })
        })

        it('should handle mixed valid and invalid GUIDs', async () => {
            const input = screen.getByRole('textbox')
            const mixedGuids = '550e8400-e29b-41d4-a716-446655440000, invalid-guid, 6ba7b810-9dad-11d1-80b4-00c04fd430c8'
            fireEvent.change(input, { target: { value: mixedGuids } })

            await waitFor(() => {
                expect(screen.getByText('Bulk Conversion Results (3 GUIDs)')).toBeInTheDocument()
                expect(screen.getAllByText('Success')).toHaveLength(2)
                expect(screen.getByText('Invalid GUID format')).toBeInTheDocument()
            })
        })

        it('should handle different separators (commas, spaces, newlines)', async () => {
            const input = screen.getByRole('textbox')
            const guids = `550e8400-e29b-41d4-a716-446655440000,6ba7b810-9dad-11d1-80b4-00c04fd430c8
      6ba7b811-9dad-11d1-80b4-00c04fd430c8 6ba7b812-9dad-11d1-80b4-00c04fd430c8`
            fireEvent.change(input, { target: { value: guids } })

            await waitFor(() => {
                expect(screen.getByText('Bulk Conversion Results (4 GUIDs)')).toBeInTheDocument()
            })
        })

        it('should handle MongoDB Base64 in bulk mode', async () => {
            const input = screen.getByRole('textbox')
            const mixedGuids = '550e8400-e29b-41d4-a716-446655440000, zsepo5mfDUiWBErjVkslIw=='
            fireEvent.change(input, { target: { value: mixedGuids } })

            await waitFor(() => {
                expect(screen.getByText('Bulk Conversion Results (2 GUIDs)')).toBeInTheDocument()
                // Both should be successful
                const successElements = screen.getAllByText('Success')
                expect(successElements).toHaveLength(2)
            })
        })

        it('should show error when no valid GUIDs found', async () => {
            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: 'invalid1, invalid2, invalid3' } })

            await waitFor(() => {
                expect(screen.getByText('No valid GUIDs found. Please enter at least one valid GUID.')).toBeInTheDocument()
            })
        })
    })

    describe('CSV Generation', () => {
        beforeEach(async () => {
            render(<GuidConverter />)

            const bulkToggle = screen.getByRole('checkbox')
            fireEvent.click(bulkToggle)
        })

        it('should generate correct CSV format', async () => {
            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            await waitFor(() => {
                const csvTextarea = screen.getByDisplayValue(/Original GUID,Standard GUID,Hexadecimal,Base64,Status/) as HTMLTextAreaElement
                expect(csvTextarea.value).toContain('"550e8400-e29b-41d4-a716-446655440000"')
                expect(csvTextarea.value).toContain('"Success"')
            })
        })




    })

    describe('Copy Functionality', () => {
        it('should copy standard GUID format', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            await waitFor(() => {
                const copyButtons = screen.getAllByText('Copy')
                fireEvent.click(copyButtons[0]) // First copy button (Standard GUID)
            })

            await waitFor(() => {
                expect(mockClipboard.writeText).toHaveBeenCalledWith(expect.stringMatching(/^[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}$/))
                expect(screen.getByText('Standard GUID copied to clipboard!')).toBeInTheDocument()
            })
        })

        it('should copy CSV in bulk mode', async () => {
            render(<GuidConverter />)

            const bulkToggle = screen.getByRole('checkbox')
            fireEvent.click(bulkToggle)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            await waitFor(() => {
                const csvCopyButton = screen.getByText('Copy CSV')
                fireEvent.click(csvCopyButton)
            })

            await waitFor(() => {
                expect(mockClipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('Original GUID,Standard GUID,Hexadecimal,Base64,Status'))
                expect(screen.getByText('CSV copied to clipboard!')).toBeInTheDocument()
            })
        })

        it('should handle clipboard API failures gracefully', async () => {
            mockClipboard.writeText.mockRejectedValue(new Error('Clipboard API failed'))

            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            await waitFor(() => {
                const copyButtons = screen.getAllByText('Copy')
                fireEvent.click(copyButtons[0])
            })

            await waitFor(() => {
                expect(screen.getByText('Failed to copy Standard GUID')).toBeInTheDocument()
            })
        })

        it('should clear success message after timeout', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            expect(screen.getByText('Conversion Results')).toBeInTheDocument()

            const copyButtons = screen.getAllByText('Copy')
            fireEvent.click(copyButtons[0])

            // Wait for success message to appear
            await waitFor(() => {
                expect(screen.getByText('Standard GUID copied to clipboard!')).toBeInTheDocument()
            })

            // Wait for success message to clear (2 second timeout)
            await waitFor(() => {
                expect(screen.queryByText('Standard GUID copied to clipboard!')).not.toBeInTheDocument()
            }, { timeout: 3000 })
        })
    })

    describe('Input Validation Edge Cases', () => {
        it('should handle empty input', () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '' } })

            expect(screen.queryByText('Invalid GUID format')).not.toBeInTheDocument()
        })

        it('should handle whitespace-only input', () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '   \n\t   ' } })

            expect(screen.queryByText('Invalid GUID format')).not.toBeInTheDocument()
        })

        it('should strip quotes and braces from input', () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '"{550e8400-e29b-41d4-a716-446655440000}"' } })

            expect(screen.getByText('Conversion Results')).toBeInTheDocument()
        })

        it('should handle parentheses around GUID', () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '(550e8400-e29b-41d4-a716-446655440000)' } })

            expect(screen.getByText('Conversion Results')).toBeInTheDocument()
        })
    })

    describe('Button Actions', () => {
        it('should load standard example', () => {
            render(<GuidConverter />)

            const loadButton = screen.getByText('Load Standard Example')
            fireEvent.click(loadButton)

            expect(screen.getByDisplayValue('550e8400-e29b-41d4-a716-446655440000')).toBeInTheDocument()
        })

        it('should generate random GUID', () => {
            render(<GuidConverter />)

            const randomButton = screen.getByText('Generate Random')
            fireEvent.click(randomButton)

            expect(screen.getByDisplayValue('550e8400-e29b-41d4-a716-446655440000')).toBeInTheDocument()
        })

        it('should clear input', async () => {
            render(<GuidConverter />)

            const input = screen.getByRole('textbox')
            fireEvent.change(input, { target: { value: '550e8400-e29b-41d4-a716-446655440000' } })

            const clearButton = screen.getByText('Clear Input')
            fireEvent.click(clearButton)

            expect((input as HTMLInputElement).value).toBe('')
        })
    })
})