// Base64 encoding/decoding utilities

export function encodeBase64(text: string): string {
  try {
    // Handle Unicode properly
    return btoa(unescape(encodeURIComponent(text)))
  } catch (error) {
    throw new Error('Failed to encode text as Base64')
  }
}

export function decodeBase64(base64: string): string {
  try {
    // Handle Unicode properly
    return decodeURIComponent(escape(atob(base64)))
  } catch (error) {
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
  } catch (error) {
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

// JWT utilities (decode only, no verification)

export interface JWTHeader {
  alg: string
  typ: string
  [key: string]: any
}

export interface JWTPayload {
  iss?: string
  sub?: string
  aud?: string | string[]
  exp?: number
  nbf?: number
  iat?: number
  jti?: string
  [key: string]: any
}

export interface DecodedJWT {
  header: JWTHeader
  payload: JWTPayload
  signature: string
}

function base64UrlDecode(str: string): string {
  // Replace URL-safe characters
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  
  // Add padding if needed
  switch (base64.length % 4) {
    case 2:
      base64 += '=='
      break
    case 3:
      base64 += '='
      break
  }
  
  return atob(base64)
}

export function decodeJWT(token: string): DecodedJWT {
  const parts = token.split('.')
  
  if (parts.length !== 3) {
    throw new Error('Invalid JWT: must have three parts separated by dots')
  }
  
  try {
    const header = JSON.parse(base64UrlDecode(parts[0]))
    const payload = JSON.parse(base64UrlDecode(parts[1]))
    const signature = parts[2]
    
    return { header, payload, signature }
  } catch (error) {
    throw new Error('Invalid JWT: failed to decode parts')
  }
}

export function isValidJWT(token: string): boolean {
  try {
    decodeJWT(token)
    return true
  } catch {
    return false
  }
}

// Timestamp utilities

export function unixToDate(timestamp: number, isMilliseconds = false): Date {
  return new Date(isMilliseconds ? timestamp : timestamp * 1000)
}

export function dateToUnix(date: Date, toMilliseconds = false): number {
  return toMilliseconds ? date.getTime() : Math.floor(date.getTime() / 1000)
}

export function formatTimestamp(timestamp: number, format: 'iso' | 'rfc' | 'local' = 'iso'): string {
  const date = unixToDate(timestamp)
  
  switch (format) {
    case 'iso':
      return date.toISOString()
    case 'rfc':
      return date.toUTCString()
    case 'local':
      return date.toLocaleString()
    default:
      return date.toString()
  }
}