// Base64 encoding/decoding utilities

export function encodeBase64(text: string): string {
  try {
    // Handle Unicode properly
    return btoa(unescape(encodeURIComponent(text)))
  } catch {
    throw new Error('Failed to encode text as Base64')
  }
}

export function decodeBase64(base64: string): string {
  try {
    // Handle Unicode properly
    return decodeURIComponent(escape(atob(base64)))
  } catch {
    throw new Error('Invalid Base64 string')
  }
}

export function encodeBase64FromFile(file: ArrayBuffer): string {
  const bytes = new Uint8Array(file)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export function decodeBase64ToFile(base64: string): ArrayBuffer {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

// URL encoding/decoding utilities

export function encodeUrl(text: string): string {
  return encodeURIComponent(text)
}

export function decodeUrl(encoded: string): string {
  try {
    return decodeURIComponent(encoded)
  } catch {
    throw new Error('Invalid URL encoded string')
  }
}

export function parseQueryString(queryString: string): Record<string, string> {
  const params: Record<string, string> = {}

  // Remove leading ? if present
  const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString

  if (!cleanQuery) return params

  const pairs = cleanQuery.split('&')

  for (const pair of pairs) {
    const [key, ...valueParts] = pair.split('=')
    if (key) {
      const value = valueParts.join('=') // Handle = signs in values
      params[decodeUrl(key)] = value ? decodeUrl(value) : ''
    }
  }

  return params
}

export function buildQueryString(params: Record<string, string>): string {
  const pairs: string[] = []

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      pairs.push(`${encodeUrl(key)}=${encodeUrl(String(value))}`)
    } else {
      pairs.push(encodeUrl(key))
    }
  }

  return pairs.length > 0 ? `?${pairs.join('&')}` : ''
}

