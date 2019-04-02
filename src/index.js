var lib = require('./lib');

/** Uin8Array with zero items */
var EMPTY_UINT8_ARRAY = new Uint8Array(0);

/**
 * Generates the Name-Based UUID hashes v3 and v5 according to RFC-4122
 * https://tools.ietf.org/html/rfc4122#section-4.3
 * @param {string} target Hashing target
 * @param {string} [namespace] Some name space within which generation occurs
 * @param {3|5} [version=5] Version of UUID. Available versions is 3 and 5
 * according to RFC-4122. The version is responsible for the hashing algorithm:
 * version 3 uses MD5, and version 5 uses SHA-1. Default is 5.
 * @returns {string} UUID
 */
function generateUuid(target, namespace, version) {
  if (typeof target !== 'string') {
    throw TypeError('Value must be string');
  }

  if (typeof namespace === 'number') {
    return generateUuid(target, undefined, namespace);
  }

  if (version == null) {
    return generateUuid(target, namespace, 5);
  }

  if (version !== 3 && version !== 5) {
    throw TypeError('Version of UUID can be only 3 or 5');
  }

  // Parsing target chars
  var charBuffer = lib.stringToCharBuffer(target);

  // TODO: Test namespace for uuid and parse to buffer
  var namespaceCharBuffer = typeof namespace === 'string' ? lib.stringToCharBuffer(namespace) : EMPTY_UINT8_ARRAY;

  // Concatenation two buffers of strings to one
  var buffer = lib.concatBuffers(namespaceCharBuffer, charBuffer);

  // Getting hash
  var hash = version === 3 ? lib.md5Hash(buffer) : lib.sha1Hash(buffer);

  return lib.hashToUuid(hash, version);
}

/**
 * Export module
 */
module.exports = generateUuid;
