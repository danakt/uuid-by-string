var md5 = require('js-md5');
var sha1 = require('js-sha1');

/** List of hex digit for fast accessing by index */
var HEX_DIGITS = '0123456789abcdef'.split('');

/** Length of string containing uuid */
var UUID_LENGTH = 36;

/** Regular expression for uuid testing */
var UUID_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/** Map matching of hex number and corresponding byte */
var HEX_TO_BYTE_MAP = (function () {
  var map = {};

  for (var i = 0; i < 256; i++) {
    var hex = i.toString(16);

    map[hex.length === 1 ? '0' + hex : hex] = i;
  }

  return map;
})();

/**
 * Converts unsigned byte to hex representation
 * @param {number} ubyte The unsigned byte to convert
 * @returns {string} The hex representation
 */
var uint8ToHex = function (ubyte) {
  var first = ubyte >> 4;
  var second = ubyte - (first << 4);

  return HEX_DIGITS[first] + HEX_DIGITS[second];
};

/**
 * Converts unsigned byte buffer to hex string
 * @param {Uint8Array} buf The unsigned bytes buffer
 * @returns {string} The hex string representation
 */
var uint8ArrayToHex = function (buf) {
  var out = '';

  for (var i = 0; i < buf.length; i++) {
    out += uint8ToHex(buf[i]);
  }

  return out;
};

/**
 * Converts string to buffer of char codes
 * @param {string} str The string to parse
 * @returns {Uint8Array} Buffer of char codes
 */
var stringToCharBuffer = function (str) {
  var escapedStr = unescape(encodeURIComponent(str));
  var buffer = new Uint8Array(escapedStr.length);

  for (var i = 0; i < escapedStr.length; i++) {
    buffer[i] = escapedStr[i].charCodeAt(0);
  }

  return buffer;
};

/**
 * Generates MD5 hash from buffer
 * @param {Uint8Array} buf Buffer of char codes
 * @returns {Uint8Array} MD5 hash buffer
 */
var md5Hash = function (buf) {
  return new Uint8Array(md5.arrayBuffer(buf));
};

/**
 * Generates SHA-1 hash from buffer
 * @param {Uint8Array} buf Buffer of char codes
 * @returns {Uint8Array} SHA-1 hash buffer
 */
var sha1Hash = function (buf) {
  return new Uint8Array(sha1.arrayBuffer(buf));
};

/**
 * Concatenates two uint8 buffers
 * @param {Uint8Array} buf1 The first buffer to concatenate
 * @param {Uint8Array} buf2 The second buffer to concatenate
 * @returns {Uint8Array} Concatenation result
 */
var concatBuffers = function (buf1, buf2) {
  var out = new Uint8Array(buf1.length + buf2.length);

  out.set(new Uint8Array(buf1), 0);
  out.set(new Uint8Array(buf2), buf1.byteLength);

  return out;
};

/**
 * Validates UUID
 * @param {string} uuid UUID to validate
 * @return {boolean} Validation result
 */
var validateUuid = function (uuid) {
  return typeof uuid === 'string' && uuid.length === UUID_LENGTH && UUID_REGEXP.test(uuid);
};

/**
 * Parses UUID into a buffer
 * @param {string} uuid UUID to parse
 * @returns {Uint8Array} Ready buffer
 */
var parseUuid = function (uuid) {
  if (!validateUuid(uuid)) {
    throw TypeError('Invalid UUID');
  }

  var buf = new Uint8Array(16);
  var strIndex = 0;
  var bufIndex = 0;

  while (strIndex < uuid.length) {
    if (uuid[strIndex] === '-') {
      strIndex++;
      continue;
    }

    var oct = (uuid[strIndex] + uuid[strIndex + 1]).toLowerCase();
    buf[bufIndex] = HEX_TO_BYTE_MAP[oct];

    bufIndex++;
    strIndex += 2;
  }

  return buf;
};

/**
 * Creates uuid from hash buffer
 * @param {Uint8Array} hashBuffer Hash buffer
 * @param {3|5} version Version of uuid
 * @returns {string} The uuid
 */
var hashToUuid = function (hashBuffer, version) {
  return (
    // The low field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(0, 4)) +
    '-' +
    // The middle field of the timestamp
    uint8ArrayToHex(hashBuffer.slice(4, 6)) +
    '-' +
    // The high field of the timestamp multiplexed with the version number
    uint8ToHex((hashBuffer[6] & 0x0f) | parseInt(version * 10, 16)) +
    uint8ToHex(hashBuffer[7]) +
    '-' +
    // The high field of the clock sequence multiplexed with the variant
    uint8ToHex((hashBuffer[8] & 0x3f) | 0x80) +
    // The low field of the clock sequence
    uint8ToHex(hashBuffer[9]) +
    '-' +
    //  The spatially unique node identifier
    uint8ArrayToHex(hashBuffer.slice(10, 16))
  );
};

module.exports = {
  uint8ToHex: uint8ToHex,
  uint8ArrayToHex: uint8ArrayToHex,
  stringToCharBuffer: stringToCharBuffer,
  md5Hash: md5Hash,
  sha1Hash: sha1Hash,
  concatBuffers: concatBuffers,
  validateUuid: validateUuid,
  parseUuid: parseUuid,
  hashToUuid: hashToUuid,
};
