/**
 * Snippet for generating UUID based on a string
 * @author Danakt Frost <mail@danakt.ru>
 */

/** ----------------------------------------------------------------------------
 * @param  {String} a
 * @param  {String} b
 * @param  {String} c
 * @return {String}
 */
function makeUUID(a, b, c) {
    var s = [
        a,
        b.substr(0, 4),
        4 + b.substr(4, 3),
        (Number('0x' + b[7]) & 0x3 | 0x8).toString(16) + b.substr(8, 3),
        c
    ]

    return s.join('-').toUpperCase()
}

/** ----------------------------------------------------------------------------
 * @param  {String} input
 * @param  {Number} key
 * @param  {Number} maxlen
 * @return {String}
 */
function getHex(input, key, maxlen) {
    var n = 1
    var i = 1
    var count = 1

    var str = input.trim()

    /**
     * 14-digit number in hex is 16-digit in base-10, in turn, the js
     * rounds everything that comes after the 16th sign among
     */
    maxlen = Math.min(maxlen || 14, 14)

    for (; true; i++) {
        if (count++ >= str.length && n.toString(16).length >= maxlen) {
            break
        }

        if (str[i] == null) {
            i = 0
        }

        n *= (str.charCodeAt(i) + (i * str.length)) * key
        n = Number(String(n).replace(/0+$/g, ''))

        while (n.toString(16).length > maxlen) {
            n = Math.floor(n / 10)
        }
    }

    return n.toString(16)
}

/** ----------------------------------------------------------------------------
* @function getUUIDByString
* @param    {String} str — String for get UUID
* @returns  {String}     — UUID
*/
function getUUIDByString(str) {
   return makeUUID(
       getHex(str, 0xf6, 8),
       getHex(str, 0x51c, 11),
       getHex(str, 0xd7a, 12)
   )
}

/** ----------------------------------------------------------------------------
 * @exports
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = getUUIDByString
} else if (typeof window !== 'undefined') {
    window.getUUID = getUUIDByString
} else {
    throw new Error('Unknown environment')
}
