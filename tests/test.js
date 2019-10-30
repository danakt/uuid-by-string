const generateUuid = require('..');
const { uint8ToHex, md5Hash, stringToCharBuffer, sha1Hash, hashToUuid, uint8ArrayToHex } = require('../src/lib');
const { longText } = require('./__mock__/longText');
const { samples } = require('./__mock__/samples');

const UUID_REGEXP = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;

const hex = [[255, 'ff'], [0, '00'], [8, '08'], [11, '0b'], [111, '6f']];

describe('unit tests', () => {
  test('should convert byte number to hex representation', () => {
    for (const item of hex) {
      expect(uint8ToHex(item[0])).toBe(item[1]);
    }
  });

  test('should convert byte array to hex string', () => {
    for (let i = 0; i < samples.length; i++) {
      const hex = Buffer.from(samples[i].md5Hash).toString('hex');
      expect(uint8ArrayToHex(samples[i].md5Hash)).toBe(hex);
    }
  });

  test('should convert string to char buffer', () => {
    for (let i = 0; i < samples.length; i++) {
      expect(stringToCharBuffer(samples[i].string)).toMatchSnapshot();
    }
  });

  test('should generate valid md5 hash', () => {
    for (let i = 0; i < samples.length; i++) {
      expect(md5Hash(stringToCharBuffer(samples[i].string))).toEqual(samples[i].md5Hash);
    }
  });

  test('should generate valid sha-1 hash', () => {
    for (let i = 0; i < samples.length; i++) {
      expect(sha1Hash(stringToCharBuffer(samples[i].string))).toEqual(samples[i].sha1Hash);
    }
  });

  test('should convert hash to uuid v3', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = hashToUuid(samples[i].md5Hash, 3);
      expect(uuid).toEqual(samples[i].uuidV3);
      expect(uuid).toMatch(UUID_REGEXP);
    }
  });

  test('should convert hash to uuid v5', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = hashToUuid(samples[i].sha1Hash, 5);
      expect(uuid).toEqual(samples[i].uuidV5);
      expect(uuid).toMatch(UUID_REGEXP);
    }
  });
});

describe('func tests', () => {
  test('should throw error because of the wrong value', () => {
    expect(() => generateUuid()).toThrowError();
  });

  test('should throw error because of the wrong version', () => {
    expect(() => generateUuid('Hello', 'world', 1)).toThrowError();
  });

  test('should generate uuid v3 from string', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = generateUuid(samples[i].string, 3);

      expect(uuid).toMatch(UUID_REGEXP);
      expect(uuid).toEqual(samples[i].uuidV3);
    }
  });

  test('should generate uuid v3 from string with namespace', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = generateUuid(samples[i].string, 'namespace');

      expect(uuid).toMatch(UUID_REGEXP);
      expect(uuid).not.toEqual(samples[i].uuidV3);
    }
  });

  test('should generate uuid v5 from string', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = generateUuid(samples[i].string);

      expect(uuid).toMatch(UUID_REGEXP);
      expect(uuid).toEqual(samples[i].uuidV5);
    }
  });

  test('should generate uuid v5 from string with namespace', () => {
    for (let i = 0; i < samples.length; i++) {
      const uuid = generateUuid(samples[i].string, 'namespace', 5);

      expect(uuid).toMatch(UUID_REGEXP);
      expect(uuid).not.toEqual(samples[i].uuidV5);
    }
  });

  test('should generate platform compatible uuid', () => {
    expect(generateUuid('9239107d-259f-4cf8-b62d-0964b680ab08', 3)).toBe('12f01aa4-5090-3f83-b823-7e7cb43246e7');
  });
});

describe('checker of speed of one generation', () => {
  it('100k chars', () => {
    generateUuid(longText);
  });
});
