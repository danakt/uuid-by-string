/**
 * Generation the Name-Based UUID v3 and v5 according to RFC-4122
 * https://tools.ietf.org/html/rfc4122#section-4.3
 *
 * @author Danakt Frost <danakt@protonmail.com>
 */
import * as md5 from 'js-md5'
import * as sha1 from 'js-sha1'

/** List of hex digit for fast accessing by index */
const HEX_DIGITS = '0123456789abcdef'.split('')

/** Uin8Array with zero items */
const EMPTY_UINT8_ARRAY = new Uint8Array(0)

/**
 * Converts unsigned byte to hex representation
 */
export const uint8ToHex = (byte: number): string => {
  const first = byte >> 4
  const second = byte - (first << 4)

  return HEX_DIGITS[first] + HEX_DIGITS[second]
}

/**
 * Converts unsigned byte buffer to hex string
 */
export const uint8ArrayToHex = (buf: Uint8Array): string => {
  const out: string[] = []

  for (let i = 0; i < buf.length; i++) {
    out.push(uint8ToHex(buf[i]))
  }

  return out.join('')
}

/**
 * Converts
 */
export const stringToCharBuffer = (str: string) => {
  const buffer = new Uint8Array(str.length)

  for (let i = 0; i < str.length; i++) {
    buffer[i] = str[i].charCodeAt(0)
  }

  return buffer
}

/**
 * Generates MD5 hash from buffer
 */
export const md5Hash = (buf: Uint8Array): Uint8Array =>
  new Uint8Array(md5.arrayBuffer(buf))

/**
 * Generates SHA-1 hash from buffer
 */
export const sha1Hash = (buf: Uint8Array): Uint8Array =>
  new Uint8Array(sha1.arrayBuffer(buf))

/**
 * Concatenates two uint8 buffers
 */
export const concatBuffers = (buf1: Uint8Array, buf2: Uint8Array) => {
  const out = new Buffer(buf1.length + buf2.length)

  out.set(new Uint8Array(buf1), 0)
  out.set(new Uint8Array(buf2), buf1.byteLength)

  return out
}

/**
 * Creates uuid from hash buffer
 * @param hashBuffer Hash buffer
 * @param version Version of uuid (3 or 5)
 */
export const hashToUuid = (
  hashBuffer: Uint8Array,
  version: 0x03 | 0x05
): string => {
  return [
    // The low field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(0, 4)),
    '-',

    // The middle field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(4, 6)),
    '-',

    // The high field of the timestamp multiplexed with the version number
    uint8ToHex((hashBuffer[6] & 0x0f) | (version * 10)),
    uint8ToHex(hashBuffer[7]),
    '-',

    // The high field of the clock sequence multiplexed with the variant
    uint8ToHex((hashBuffer[8] & 0x3f) | 0x80),
    // The low field of the clock sequence
    uint8ToHex(hashBuffer[9]),

    '-',
    //  The spatially unique node identifier

    uint8ArrayToHex(hashBuffer.slice(10, 16))
  ].join('')
}

/**
 *
 * @param value Value
 * @param namespace Namespace
 * @param version
 */
export const generateUuid = (
  value: string,
  namespace?: string | number,
  version?: number
): string => {
  if (typeof value !== 'string') {
    throw TypeError('Value must be string')
  }

  if (typeof namespace === 'number') {
    return generateUuid(value, undefined, namespace)
  }

  if (version == null) {
    return generateUuid(value, namespace, 3)
  }

  if (version !== 3 && version !== 5) {
    throw TypeError('Version of UUID can be only 3 or 5')
  }

  const valueBuffer = stringToCharBuffer(value)

  // TODO: Test namespace for uuid and parse to buffer
  const namespaceBuffer =
    typeof namespace === 'string'
      ? stringToCharBuffer(namespace)
      : EMPTY_UINT8_ARRAY

  // Concatenation two buffers of strings to one
  const buffer = concatBuffers(namespaceBuffer, valueBuffer)

  // Getting hash
  const hash = version === 3 ? md5Hash(buffer) : sha1Hash(buffer)

  return hashToUuid(hash, version)
}
