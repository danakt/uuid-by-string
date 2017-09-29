/**
 * Generating UUID based on a string
 * @author Danakt Frost <mail@danakt.ru>
 */

/** 
 * Generates part of UUID
 * @param  {string} input
 * @param  {number} key
 * @param  {number} maxlen
 * @return {string}
 */
function generatePart(input, key, maxlen) {
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

/** 
 * Formats parts of UUID
 * @param  {Array<string>} parts 
 * @return {string}
 */
function makeUUID(parts) {
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
 * @param  {string} str — String for get UUID
 * @return {string}     — UUID
 */
function getUUIDByString(str) {
    var keysTable = [
        [0xf6, 8],
        [0x51c, 11],
        [0xd7a, 12],
    ]
    
    var uuidParts = keysTable.map(function(item) {
        return generatePart(str, item[0], item[1])
    })
    
    return makeUUID(uuidParts)
}

/** 
 * @exports
 */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = getUUIDByString
} else if (typeof window !== 'undefined') {
    window.getUUID = getUUIDByString
} else {
    throw new Error('Unknown environment')
}
