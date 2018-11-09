import { createHash } from 'crypto'

/**
 * Default UUID for empty string
 * @type {string}
 */
const DEFAULT_UUID = '00000000-0000-4000-8000-000000000000'

/**
 * Keys of UUID parts for hashing
 * @type {Array<number>}
 */
const KEYS_TABLE = [0xf6, 0x51c, 0xd7a]

/**
 * Removes trailing zeros in integer
 * @param  {number} int
 * @return {number}
 */
function removeTrailingZeros(int: number) {
  let out = int
  let n = out / 10

  // I don't know why, but that:
  // (out % 10 === 0)
  // 2 times slower than that:
  while (Math.floor(n) === n) {
    out = n
    n = n / 10
  }

  return out
}

/**
 * Returns length of hexadecimal representation of decimal number
 * Slower variant:
 * @code
 *   function getLengthOfHexByInt(int) {
 *     return int.toString(16).length
 *   }
 *
 * @param  {number} int decimal integer
 * @return {number}     length of hex representation of the number
 */
function getLengthOfHexByInt(int: number): number {
  let acc = int

  for (var len = 1; acc > 16; len++) {
    acc /= 16
  }

  return len
}

/**
 * Generates part of UUID
 * @param  {string} input
 * @param  {number} key
 * @param  {number} maxHexLength
 * @return {string}
 */
function generatePart(
  input: string,
  key: number,
  maxHexLength: number
): string {
  // 14-digit number in hex is 16-digit in decimal, in turn, the js
  // rounds everything that comes after the 16th sign among
  if (maxHexLength == null || maxHexLength > 14) {
    return generatePart(input, key, 14)
  }

  let acc = 1
  let charIndex = 1
  let count = 1
  const str = input.trim()
  const strLength = str.length

  while (count < strLength || getLengthOfHexByInt(acc) < maxHexLength) {
    count++

    if (str.charAt(charIndex) === '') {
      charIndex = 0
    }

    acc *= (str.charCodeAt(charIndex) + charIndex * strLength) * key
    acc = removeTrailingZeros(acc)

    while (getLengthOfHexByInt(acc) > maxHexLength) {
      acc = Math.floor(acc / 10)
    }

    charIndex++
  }

  return acc.toString(16)
}

/**
 * Makes UUID
 * @param  {string} input String for get UUID
 * @return {string}       UUID
 */
function getUuidByString(input: string) {
  const str = input.toString()

  if (str.length === 0) {
    return DEFAULT_UUID
  }

  const lengthsList = [8, 11, 12]
  const parts = KEYS_TABLE.map((hex, i) =>
    generatePart(str, hex, lengthsList[i])
  )

  // Prepare parts of UUID
  // UUID: 00000000-0000-4000-8000-000000000000
  //            ↓    ↓    ↓    ↓    ↓
  // Parts:     1    2    3    4    5
  const preparedParts = [
    parts[0],
    parts[1].substr(0, 4),
    `4${parts[1].substr(4, 3)}`,
    ((parseInt(parts[1][7], 16) & 0x3) | 0x8).toString(16) +
      parts[1].substr(8, 3),
    parts[2]
  ].join('-')

  return preparedParts
}

/**
 * @exports
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = getUuidByString
} else if (typeof window !== 'undefined') {
  window.getUuidByString = getUuidByString
  // Legacy
  window.getUUID = getUuidByString
} else {
  throw new Error('Unknown environment')
}
