/**
 * Generating UUID based on a string
 * @author Danakt Frost <mail@danakt.ru>
 * @todo Make it faster
 *
 * Changelist
 * — 0.4.0
 * Made more than 10 times faster
 * — 0.5.0
 * Made twice faster
 * — 0.6.0
 * Added typescript typings
 */
'use strict'

/**
 * Default UUID for empty string
 * @type {string}
 */
var DEFAULT_UUID = '00000000-0000-4000-8000-000000000000'

/**
 * Keys of UUID parts for hashing
 * @type {Array<number>}
 */
var KEYS_TABLE = [0xf6, 0x51c, 0xd7a]

/**
 * Removes trailing zeros in integer
 * @param  {number} int
 * @return {number}
 */
function removeTrailingZeros(int) {
  var out = int
  var n = out / 10

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
 * Returns length of hexadecimal representation of decadic number
 * Slower variant: number.toString(16).length
 *
 * @param  {number} int 10-degit integer
 * @return {number}     length of 16-degit number
 */
function getLengthOfHexByInt(int) {
  var len = 1
  var acc = int

  while (acc / 16 > 1) {
    acc /= 16
    len++
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
function generatePart(input, key, maxHexLength) {
  // 14-digit number in hex is 16-digit in base-10, in turn, the js
  // rounds everything that comes after the 16th sign among
  if (maxHexLength == null || maxHexLength > 14) {
    return generatePart(input, key, 14)
  }

  var acc = 1
  var charIndex = 1
  var count = 1
  var str = input.trim()
  var strLength = str.length

  while (count < strLength || getLengthOfHexByInt(acc) < maxHexLength) {
    count++

    if (str.charAt(charIndex) === '') {
      charIndex = 0
    }

    acc *= (str.charCodeAt(charIndex) + (charIndex * strLength)) * key
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
function getUuidByString(input) {
  var str = input.toString()

  if (str.length === 0) {
    return DEFAULT_UUID
  }

  var lengthsList = [8, 11, 12]
  var parts = KEYS_TABLE.map(function (hex, i) {
    return generatePart(str, hex, lengthsList[i])
  })

  // Prepare parts of UUID
  // UUID: 00000000-0000-4000-8000-000000000000
  //            ↓    ↓    ↓    ↓    ↓
  // Parts:     1    2    3    4    5
  var preparedParts = [
    parts[0],
    parts[1].substr(0, 4),
    '4' + parts[1].substr(4, 3),
    (parseInt(parts[1][7], 16) & 0x3 | 0x8).toString(16) + parts[1].substr(8, 3),
    parts[2]
  ].join('-')

  return preparedParts.toUpperCase()
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
