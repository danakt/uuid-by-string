/**
 * Generates the Name-Based UUID v3 and v5 according to RFC-4122
 * https://tools.ietf.org/html/rfc4122#section-4.3
 * @param {string} target Hashing target
 * @param {string} [namespace] Some name space within which generation occurs
 * @param {3|5} [version=3] Version of UUID. Available versions is 3 and 5
 * according to RFC-4122. The version is responsible for the hashing algorithm:
 * version 3 uses MD5, and version 5 uses SHA-1.
 * @returns {string} UUID
 */
declare function getUuidByString(target: string, namespace?: string, version?: 3 | 5): string
declare function getUuidByString(target: string, version?: 3 | 5): string

// prettier-ignore
declare namespace getUuidByString {}
export = getUuidByString
