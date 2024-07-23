var lib = require('./lib');

/** Uin8Array with zero items */
var EMPTY_UINT8_ARRAY = new Uint8Array(0);

/** Uin8Array with 16 zeros (represents the nil UUID) */
var NIL_UUID_UINT8_ARRAY = new Uint8Array(16);

/**
 * Generates the Name-Based UUID hashes v3 and v5 according to RFC-4122
 * https://tools.ietf.org/html/rfc4122#section-4.3
 * @param {string} target Hashing target
 * @param {string} [namespace] Some name space within which generation occurs
 * @param {3|5} [version=5] Version of UUID. Available versions is 3 and 5
 * according to RFC-4122. The version is responsible for the hashing algorithm:
 * version 3 uses MD5, and version 5 uses SHA-1. Default is 5.
 * @param {boolean} [legacyMethod]
 * @returns {string} UUID
 */
function generateUuid(target, namespace, version, legacyMethod) {
  if (typeof target !== 'string') {
    throw TypeError('Value must be string');
  }

  if (typeof namespace === 'number') {
    return generateUuid(target, undefined, namespace, legacyMethod);
  }

  if (version == null) {
    return generateUuid(target, namespace, 5, legacyMethod);
  }

  if (version !== 3 && version !== 5) {
    throw TypeError('Version of UUID can be only 3 or 5');
  }

  // Parsing target chars
  var targetCharBuffer = lib.stringToCharBuffer(target);
  var namespaceCharBuffer = 
    typeof namespace === 'string'
    ? lib.parseUuid(namespace)
    : (
      legacyMethod ? EMPTY_UINT8_ARRAY : NIL_UUID_UINT8_ARRAY
    );

  // Concatenation two buffers of strings to one
  var buffer = lib.concatBuffers(namespaceCharBuffer, targetCharBuffer);

  // Getting hash
  var hash = version === 3 ? lib.md5Hash(buffer) : lib.sha1Hash(buffer);

  return lib.hashToUuid(hash, version);
}

/**
 * Export module
 */
module.exports = generateUuid;
