import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Base64Tool } from '@/tools/base64'
import { renderTool, createMockFile, getTextarea, getButton } from '@/test/test-utils'

// Mock the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockImplementation(() => Promise.resolve())
  }
})

describe('Base64Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Text Encoding', () => {
    it('should encode text to base64', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      // Find encode tab and input textarea
      const encodeTab = screen.getByRole('tab', { name: /encode/i })
      fireEvent.click(encodeTab)
      
      const inputTextarea = getTextarea(container, 'Enter text to encode')
      const encodeButton = getButton(container, 'Encode')
      
      // Enter text and encode
      fireEvent.change(inputTextarea, { target: { value: 'Hello World!' } })
      fireEvent.click(encodeButton)
      
      // Check output
      await waitFor(() => {
        const outputTextarea = getTextarea(container, 'Base64 encoded result')
        expect(outputTextarea.value).toBe('SGVsbG8gV29ybGQh')
      })
    })

    it('should decode base64 to text', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      // Find decode tab and input textarea
      const decodeTab = screen.getByRole('tab', { name: /decode/i })
      fireEvent.click(decodeTab)
      
      const inputTextarea = getTextarea(container, 'Enter base64 to decode')
      const decodeButton = getButton(container, 'Decode')
      
      // Enter base64 and decode
      fireEvent.change(inputTextarea, { target: { value: 'SGVsbG8gV29ybGQh' } })
      fireEvent.click(decodeButton)
      
      // Check output
      await waitFor(() => {
        const outputTextarea = getTextarea(container, 'Decoded result')
        expect(outputTextarea.value).toBe('Hello World!')
      })
    })

    it('should show error for invalid base64', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      const decodeTab = screen.getByRole('tab', { name: /decode/i })
      fireEvent.click(decodeTab)
      
      const inputTextarea = getTextarea(container, 'Enter base64 to decode')
      const decodeButton = getButton(container, 'Decode')
      
      // Enter invalid base64
      fireEvent.change(inputTextarea, { target: { value: 'Invalid Base64!!!' } })
      fireEvent.click(decodeButton)
      
      // Check for error message
      await waitFor(() => {
        expect(screen.getByText(/invalid base64/i)).toBeInTheDocument()
      })
    })

    it('should handle empty input gracefully', () => {
      const { container } = renderTool(<Base64Tool />)
      
      const encodeButton = getButton(container, 'Encode')
      fireEvent.click(encodeButton)
      
      // Should not crash with empty input
      const outputTextarea = getTextarea(container, 'Base64 encoded result')
      expect(outputTextarea.value).toBe('')
    })
  })

  describe('File Encoding', () => {
    it('should encode file to base64', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      // Switch to file tab
      const fileTab = screen.getByRole('tab', { name: /file/i })
      fireEvent.click(fileTab)
      
      // Create a mock file
      const mockFile = createMockFile('Test file content', 'test.txt')
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement
      
      // Simulate file selection
      Object.defineProperty(fileInput, 'files', {
        value: [mockFile],
        writable: false,
      })
      fireEvent.change(fileInput)
      
      const encodeButton = getButton(container, 'Encode File')
      fireEvent.click(encodeButton)
      
      // Check that file is processed
      await waitFor(() => {
        const outputTextarea = getTextarea(container, 'Base64 encoded file')
        expect(outputTextarea.value).toContain('VGVzdCBmaWxlIGNvbnRlbnQ=')
      })
    })

    it('should handle large file size limit', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      const fileTab = screen.getByRole('tab', { name: /file/i })
      fireEvent.click(fileTab)
      
      // Create a mock large file (over 10MB)
      const largeContent = 'x'.repeat(11 * 1024 * 1024) // 11MB
      const mockFile = createMockFile(largeContent, 'large.txt')
      const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement
      
      Object.defineProperty(fileInput, 'files', {
        value: [mockFile],
        writable: false,
      })
      fireEvent.change(fileInput)
      
      const encodeButton = getButton(container, 'Encode File')
      fireEvent.click(encodeButton)
      
      // Should show error for file too large
      await waitFor(() => {
        expect(screen.getByText(/file size exceeds 10mb limit/i)).toBeInTheDocument()
      })
    })
  })

  describe('Copy Functionality', () => {
    it('should copy output to clipboard', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      // Encode some text first
      const inputTextarea = getTextarea(container, 'Enter text to encode')
      const encodeButton = getButton(container, 'Encode')
      
      fireEvent.change(inputTextarea, { target: { value: 'Test' } })
      fireEvent.click(encodeButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container, 'Base64 encoded result')
        expect(outputTextarea.value).toBe('VGVzdA==')
      })
      
      // Find and click copy button
      const copyButton = container.querySelector('[data-testid="copy-button"]') as HTMLButtonElement
      fireEvent.click(copyButton)
      
      // Check that clipboard.writeText was called
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('VGVzdA==')
    })
  })

  describe('Download Functionality', () => {
    it('should download decoded file', async () => {
      const { container } = renderTool(<Base64Tool />)
      
      // Mock URL.createObjectURL and document.createElement
      global.URL.createObjectURL = vi.fn(() => 'mocked-url')
      global.URL.revokeObjectURL = vi.fn()
      
      const mockLink = {
        href: '',
        download: '',
        click: vi.fn(),
      }
      vi.spyOn(document, 'createElement').mockReturnValue(mockLink as any)
      
      // Switch to decode tab and decode some base64
      const decodeTab = screen.getByRole('tab', { name: /decode/i })
      fireEvent.click(decodeTab)
      
      const inputTextarea = getTextarea(container, 'Enter base64 to decode')
      const decodeButton = getButton(container, 'Decode')
      
      fireEvent.change(inputTextarea, { target: { value: 'SGVsbG8gV29ybGQh' } })
      fireEvent.click(decodeButton)
      
      await waitFor(() => {
        const outputTextarea = getTextarea(container, 'Decoded result')
        expect(outputTextarea.value).toBe('Hello World!')
      })
      
      // Find and click download button
      const downloadButton = getButton(container, 'Download')
      fireEvent.click(downloadButton)
      
      // Check that download was triggered
      expect(mockLink.click).toHaveBeenCalled()
      expect(mockLink.download).toBe('decoded.txt')
    })
  })

  describe('Tab Switching', () => {
    it('should switch between encode and decode tabs', () => {
      renderTool(<Base64Tool />)
      
      const encodeTab = screen.getByRole('tab', { name: /encode/i })
      const decodeTab = screen.getByRole('tab', { name: /decode/i })
      
      // Should start on encode tab
      expect(encodeTab).toHaveAttribute('aria-selected', 'true')
      expect(decodeTab).toHaveAttribute('aria-selected', 'false')
      
      // Switch to decode tab
      fireEvent.click(decodeTab)
      expect(decodeTab).toHaveAttribute('aria-selected', 'true')
      expect(encodeTab).toHaveAttribute('aria-selected', 'false')
    })

    it('should switch between text and file tabs', () => {
      renderTool(<Base64Tool />)
      
      const textTab = screen.getByRole('tab', { name: /text/i })
      const fileTab = screen.getByRole('tab', { name: /file/i })
      
      // Should start on text tab
      expect(textTab).toHaveAttribute('aria-selected', 'true')
      
      // Switch to file tab
      fireEvent.click(fileTab)
      expect(fileTab).toHaveAttribute('aria-selected', 'true')
    })
  })
})