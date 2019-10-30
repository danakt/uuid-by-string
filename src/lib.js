var md5 = require('js-md5');
var sha1 = require('js-sha1');

/** List of hex digit for fast accessing by index */
var HEX_DIGITS = '0123456789abcdef'.split('');

/**
 * Converts unsigned byte to hex representation
 * @param {number} ubyte The unsigned byte to convert
 * @returns {string} The hex representation
 */
var uint8ToHex = function(ubyte) {
  var first = ubyte >> 4;
  var second = ubyte - (first << 4);

  return HEX_DIGITS[first] + HEX_DIGITS[second];
};

/**
 * Converts unsigned byte buffer to hex string
 * @param {Uint8Array} buf The unsigned bytes buffer
 * @returns {string} The hex string representation
 */
var uint8ArrayToHex = function(buf) {
  var out = [];

  for (var i = 0; i < buf.length; i++) {
    out.push(uint8ToHex(buf[i]));
  }

  return out.join('');
};

/**
 * Converts string to buffer of char codes
 * @param {string} str The string to parse
 * @returns {Uint8Array} Buffer of char codes
 */
var stringToCharBuffer = function(str) {
  var buffer = new Uint8Array(str.length);

  for (var i = 0; i < str.length; i++) {
    buffer[i] = str[i].charCodeAt(0);
  }

  return buffer;
};

/**
 * Generates MD5 hash from buffer
 * @param {Uint8Array} buf Buffer of char codes
 * @returns {Uint8Array} MD5 hash buffer
 */
var md5Hash = function(buf) {
  return new Uint8Array(md5.arrayBuffer(buf));
};

/**
 * Generates SHA-1 hash from buffer
 * @param {Uint8Array} buf Buffer of char codes
 * @returns {Uint8Array} SHA-1 hash buffer
 */
var sha1Hash = function(buf) {
  return new Uint8Array(sha1.arrayBuffer(buf));
};

/**
 * Concatenates two uint8 buffers
 * @param {Uint8Array} buf1 The first buffer to concatenate
 * @param {Uint8Array} buf2 The second buffer to concatenate
 * @returns {Uint8Array} Concatenation result
 */
var concatBuffers = function(buf1, buf2) {
  var out = new Uint8Array(buf1.length + buf2.length);

  out.set(new Uint8Array(buf1), 0);
  out.set(new Uint8Array(buf2), buf1.byteLength);

  return out;
};

/**
 * Creates uuid from hash buffer
 * @param {Uint8Array} hashBuffer Hash buffer
 * @param {3|5} version Version of uuid
 * @returns {string} The uuid
 */
var hashToUuid = function(hashBuffer, version) {
  return [
    // The low field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(0, 4)),
    '-',

    // The middle field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(4, 6)),
    '-',

    // The high field of the timestamp multiplexed with the version number
    uint8ToHex((hashBuffer[6] & 0x0f) | parseInt(version * 10, 16)),
    uint8ToHex(hashBuffer[7]),
    '-',

    // The high field of the clock sequence multiplexed with the variant
    uint8ToHex((hashBuffer[8] & 0x3f) | 0x80),
    // The low field of the clock sequence
    uint8ToHex(hashBuffer[9]),
    '-',
    //  The spatially unique node identifier

    uint8ArrayToHex(hashBuffer.slice(10, 16))
  ].join('');
};

module.exports = {
  uint8ToHex,
  uint8ArrayToHex,
  stringToCharBuffer,
  md5Hash,
  sha1Hash,
  concatBuffers,
  hashToUuid
};
