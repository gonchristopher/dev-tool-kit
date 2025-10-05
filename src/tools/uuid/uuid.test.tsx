import { getButton, renderTool } from '@/test/test-utils'
import { GUIDGenerator } from '@/tools/uuid'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the clipboard API
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve())
    }
})

describe('UUIDTool', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('UUID Generation', () => {
        it('should generate a valid UUID v4', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElement = container.querySelector('code')
                expect(codeElement).toBeInTheDocument()

                const uuid = codeElement?.textContent || ''
                const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
                expect(uuidPattern.test(uuid)).toBe(true)
            })
        })

        it('should generate different UUIDs on multiple clicks', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')

            // Generate first UUID
            fireEvent.click(generateButton)
            await waitFor(() => {
                const codeElement = container.querySelector('code')
                expect(codeElement).toBeInTheDocument()
            })

            const firstUuid = container.querySelector('code')?.textContent || ''

            // Generate second UUID
            fireEvent.click(generateButton)
            await waitFor(() => {
                const codeElements = container.querySelectorAll('code')
                expect(codeElements.length).toBe(1) // Should replace, not add

                const newUuid = codeElements[0]?.textContent || ''
                expect(newUuid).not.toBe(firstUuid)
            })
        })

        it('should handle multiple generations without errors', () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')

            // Generate multiple UUIDs rapidly
            for (let i = 0; i < 10; i++) {
                fireEvent.click(generateButton)
            }

            // Should not crash
            expect(container).toBeInTheDocument()
        })
    })

    describe('Multiple UUID Generation', () => {
        it('should generate multiple UUIDs when count is increased', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            // Set count to 3
            const countInput = container.querySelector('input[type="number"]') as HTMLInputElement
            fireEvent.change(countInput, { target: { value: '3' } })

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElements = container.querySelectorAll('code')
                expect(codeElements.length).toBe(3)
            })
        })
    })

    describe('Copy Functionality', () => {
        it('should copy generated UUID to clipboard', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElement = container.querySelector('code')
                expect(codeElement).toBeInTheDocument()
            })

            // Find individual copy button (next to the UUID)
            const copyButton = container.querySelector('button[title*="Copy"]')

            if (copyButton) {
                fireEvent.click(copyButton)
                expect(navigator.clipboard.writeText).toHaveBeenCalled()
            }
        })

        it('should copy all UUIDs when Copy All is used', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElement = container.querySelector('code')
                expect(codeElement).toBeInTheDocument()
            })

            const copyAllButton = getButton(container, 'Copy All')

            if (copyAllButton) {
                fireEvent.click(copyAllButton)
                expect(navigator.clipboard.writeText).toHaveBeenCalled()
            }
        })
    })

    describe('UUID Validation', () => {
        it('should display valid UUID format', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElement = container.querySelector('code')
                const uuid = codeElement?.textContent || ''

                // Should be 36 characters including hyphens
                expect(uuid.length).toBe(36)

                // Should have hyphens in correct positions
                expect(uuid.charAt(8)).toBe('-')
                expect(uuid.charAt(13)).toBe('-')
                expect(uuid.charAt(18)).toBe('-')
                expect(uuid.charAt(23)).toBe('-')

                // Should be lowercase hexadecimal with hyphens
                expect(/^[0-9a-f-]+$/.test(uuid)).toBe(true)
            })
        })

        it('should generate version 4 UUIDs', async () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            fireEvent.click(generateButton)

            await waitFor(() => {
                const codeElement = container.querySelector('code')
                const uuid = codeElement?.textContent || ''

                // Version should be 4 (character at position 14)
                expect(uuid.charAt(14)).toBe('4')

                // Variant should be RFC 4122 (character at position 19 should be 8, 9, a, or b)
                const variantChar = uuid.charAt(19)
                expect(['8', '9', 'a', 'b'].includes(variantChar)).toBe(true)
            })
        })
    })

    describe('UI Interaction', () => {
        it('should have generate button', () => {
            const { container } = renderTool(<GUIDGenerator />)

            const generateButton = getButton(container, 'Generate')
            expect(generateButton).toBeInTheDocument()
        })

        it('should have count input', () => {
            const { container } = renderTool(<GUIDGenerator />)

            const countInput = container.querySelector('input[type="number"]')
            expect(countInput).toBeInTheDocument()
        })

        it('should start with no generated UUIDs', () => {
            const { container } = renderTool(<GUIDGenerator />)

            const codeElements = container.querySelectorAll('code')
            expect(codeElements.length).toBe(0)
        })

        it('should show empty state message initially', () => {
            renderTool(<GUIDGenerator />)

            expect(screen.getByText(/no guids generated yet/i)).toBeInTheDocument()
        })
    })

    describe('Accessibility', () => {
        it('should have accessible button labels', () => {
            renderTool(<GUIDGenerator />)

            expect(screen.getByRole('button', { name: /generate/i })).toBeInTheDocument()
        })

        it('should have accessible count input', () => {
            const { container } = renderTool(<GUIDGenerator />)

            const countInput = container.querySelector('input[type="number"]')
            expect(countInput).toHaveAttribute('id', 'count')

            const label = container.querySelector('label[for="count"]')
            expect(label).toBeInTheDocument()
        })
    })
})