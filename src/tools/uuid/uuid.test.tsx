import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { GUIDGenerator } from '@/tools/uuid'
import { renderTool, getTextarea, getButton } from '@/test/test-utils'

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
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
        expect(uuidPattern.test(outputTextarea.value)).toBe(true)
      })
    })

    it('should generate different UUIDs on multiple clicks', async () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      
      // Generate first UUID
      fireEvent.click(generateButton)
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        expect(outputTextarea.value).toBeTruthy()
      })
      
      const firstUuid = getTextarea(container).value
      
      // Generate second UUID
      fireEvent.click(generateButton)
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        expect(outputTextarea.value).not.toBe(firstUuid)
      })
    })

    it('should handle multiple generations without errors', () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      
      // Generate multiple UUIDs rapidly
      for (let i = 0; i < 10; i++) {
        fireEvent.click(generateButton)
      }
      
      // Should not crash
      expect(container).toBeInTheDocument()
    })
  })

  describe('Copy Functionality', () => {
    it('should copy generated UUID to clipboard', async () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        expect(outputTextarea.value).toBeTruthy()
      })
      
      const copyButton = getButton(container, 'Copy') || 
                        container.querySelector('[data-testid="copy-button"]')
      
      if (copyButton) {
        fireEvent.click(copyButton)
        expect(navigator.clipboard.writeText).toHaveBeenCalled()
      }
    })
  })

  describe('UUID Validation', () => {
    it('should display valid UUID format', async () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        const uuid = outputTextarea.value
        
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
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      fireEvent.click(generateButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container)
        const uuid = outputTextarea.value
        
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
      
      const generateButton = getButton(container, 'Generate') || getButton(container, 'New UUID')
      expect(generateButton).toBeInTheDocument()
    })

    it('should have output textarea', () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const outputTextarea = getTextarea(container)
      expect(outputTextarea).toBeInTheDocument()
    })

    it('should start with empty output', () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const outputTextarea = getTextarea(container)
      expect(outputTextarea.value).toBe('')
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button labels', () => {
      renderTool(<GUIDGenerator />)
      
      // Should have buttons with accessible text
      expect(
        screen.getByRole('button', { name: /generate/i }) ||
        screen.getByRole('button', { name: /new uuid/i })
      ).toBeInTheDocument()
    })

    it('should have accessible textarea', () => {
      const { container } = renderTool(<GUIDGenerator />)
      
      const textarea = getTextarea(container)
      expect(textarea).toHaveAttribute('readonly')
    })
  })
})