/**
 * Generating UUID based on a string
 * @author Danakt Frost <mail@danakt.ru>
 *
 * @todo Make it faster
 */

/**
 * Default UUID for empty string
 * @type {string}
 */
var DEFAULT_UUID = '00000000-0000-4000-8000-000000000000'

/**
 * Generates part of UUID
 * @param  {string} input
 * @param  {number} key
 * @param  {number} maxlen
 * @return {string}
 */
function generatePart(input, key, maxlen) {
  // 14-digit number in hex is 16-digit in base-10, in turn, the js
  // rounds everything that comes after the 16th sign among
  if (maxlen == null || maxlen > 14) {
    return generatePart(input, key, 14)
  }

  var n = 1
  var i = 1
  var count = 1
  var str = input.trim()

  while (true) {
    if (count >= str.length && n.toString(16).length >= maxlen) {
      break
    }

    count++

    if (str[i] == null) {
      i = 0
    }

    n *= (str.charCodeAt(i) + (i * str.length)) * key
    n = removeTrailingZeros(n)

    while (n.toString(16).length > maxlen) {
      n = Math.floor(n / 10)
    }

    i++
  }

  return n.toString(16)
}

/**
 * Formats parts of UUID
 * @param  {Array<string>} parts
 * @return {string}
 */
function formatUuid(parts) {
  var init = parts[0]
  var mid  = parts[1]
  var fin  = parts[2]

  var s = [
    init,
    mid.substr(0, 4),
    4 + mid.substr(4, 3),
    (Number('0x' + mid[7]) & 0x3 | 0x8).toString(16) + mid.substr(8, 3),
    fin
  ]

  return s.join('-').toUpperCase()
}

/**
 * Makes UUID
 * @param  {string} str String for get UUID
 * @return {string}     UUID
 */
function getUuidByString(str) {
  if (str.length === 0) {
    return DEFAULT_UUID
  }

  var keysTable = [
    [0xf6, 8],
    [0x51c, 11],
    [0xd7a, 12],
  ]

  var uuidParts = keysTable.map(function (item) {
    return generatePart(str, item[0], item[1])
  })

  return formatUuid(uuidParts)
}

/**
 * Removes trailing zeros in integer
 * @param  {number} int
 * @return {number}
 */
function removeTrailingZeros(int) {
  var out = int

  while (Math.round(out / 10) * 10 === out) {
    out /= 10
  }

  return out
}

/**
 * @exports
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = getUuidByString
} else if (typeof window !== 'undefined') {
  window.getUUID = getUuidByString
} else {
  throw new Error('Unknown environment')
}
