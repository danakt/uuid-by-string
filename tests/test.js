const generateUuid = require('..');
const {
  uint8ToHex,
  md5Hash,
  stringToCharBuffer,
  sha1Hash,
  hashToUuid,
  uint8ArrayToHex,
  validateUuid,
  parseUuid,
} = require('../src/lib');
const { longText } = require('./__mock__/longText');

const NIL_UUID = '00000000-0000-0000-0000-000000000000'

const stringSamples = [
  '',
  'Hello world!',
  'Lorem ipsum',
  'ヒューマニズムは、イデオロギー的ヒューマニズムを発見します。多くの国では、フランスの最も例示的な例その中で、個人崇拝は政治文化の英米の種類を証明しています。社会経済発展は、伝統的な概念によると、国民投票を決定します。特に政治的不安定の状態でパワーのメカニズム、不均一。それは逆説的に見えるかもしれませんように政治的な紛争管理は、一意の機能キリスト教民主主義ナショナリズムです。近代化の概念は、マルクス主義を証明しています。',
  longText,
];

describe('unit', () => {
  test('should convert byte number to hex representation', () => {
    const hex = [
      [255, 'ff'],
      [0, '00'],
      [8, '08'],
      [11, '0b'],
      [111, '6f'],
    ];

    for (const item of hex) {
      expect(uint8ToHex(item[0])).toBe(item[1]);
    }
  });

  test('should convert byte array to hex string', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const arr = new Uint8Array([212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]);
      const hex = Buffer.from(arr).toString('hex');
      expect(uint8ArrayToHex(arr)).toBe(hex);
    }
  });

  test('should convert string to char buffer', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      expect(stringToCharBuffer(stringSamples[i])).toMatchSnapshot();
    }
  });

  test('should generate valid md5 hash', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      expect(md5Hash(stringToCharBuffer(stringSamples[i]))).toMatchSnapshot();
    }
  });

  test('should generate valid sha-1 hash', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      expect(sha1Hash(stringToCharBuffer(stringSamples[i]))).toMatchSnapshot();
    }
  });

  test('should convert hash to uuid v3', () => {
    const arr = new Uint8Array([212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]);

    const uuid = hashToUuid(arr, 3);
    expect(uuid).toMatchSnapshot();
  });

  test('should convert hash to uuid v5', () => {
    const arr = new Uint8Array([212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]);

    const uuid = hashToUuid(arr, 5);
    expect(uuid).toMatchSnapshot();
  });

  test('should validate uuid', () => {
    expect(validateUuid('d3486ae9-136e-5856-bc42-212385ea7970')).toBe(true);
  });

  test('should invalidate uuid', () => {
    expect(validateUuid('Lorem ipsum')).toBe(false);
  });

  test('should parse uuid', () => {
    expect(parseUuid('d3486ae9-136e-5856-bc42-212385ea7970')).toMatchSnapshot();
  });

  test('should throw error while parsing uuid', () => {
    expect(() => parseUuid('Lorem ipsum')).toThrowError();
  });
});

describe('integration', () => {
  test('Hello world!', () => {
    expect(generateUuid('Hello world!')).toBe('ec74fa6c-5be6-5388-8cb3-d91001210130');
  });

  test('Hello world! - legacy', () => {
    expect(generateUuid('Hello world!', undefined, undefined, true)).toBe('d3486ae9-136e-5856-bc42-212385ea7970');
  });

  test('should throw error because of the wrong value', () => {
    expect(() => generateUuid()).toThrowError();
  });

  test('should throw error because of the wrong version', () => {
    expect(() => generateUuid('Hello', 1)).toThrowError();
    expect(() => generateUuid('Hello', 'd3486ae9-136e-5856-bc42-212385ea7970', 1)).toThrowError();
  });

  test('should generate uuid v3 from string', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i], 3);

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate uuid v3 from string - legacy', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i], undefined, 3, true);

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate uuid v3 from string with namespace', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i], 'd3486ae9-136e-5856-bc42-212385ea7970');

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate uuid v5 from string', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i]);

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate uuid v5 from string - legacy', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i], undefined, undefined, true);

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate uuid v5 from string with namespace', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      const uuid = generateUuid(stringSamples[i], 'd3486ae9-136e-5856-bc42-212385ea7970', 5);

      expect(uuid).toMatchSnapshot();
    }
  });

  test('should generate platform compatible uuid', () => {
    expect(generateUuid('9239107d-259f-4cf8-b62d-0964b680ab08', 3)).toBe('027cee5f-02c5-313a-8acd-62f33637e544');
  });

  test('should generate platform compatible uuid - legacy', () => {
    expect(generateUuid('9239107d-259f-4cf8-b62d-0964b680ab08', undefined, 3, true)).toBe('12f01aa4-5090-3f83-b823-7e7cb43246e7');
  });
});

describe('checker of speed of one generation', () => {
  it('100k chars', () => {
    generateUuid(longText);
  });
});

describe('tests for the nil UUID namespace', () => {
  test('v3', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      expect(
        generateUuid(stringSamples[i], NIL_UUID, 3)
      ).toBe(
        generateUuid(stringSamples[i], 3)
      );
    }
  });

  test('v5', () => {
    for (let i = 0; i < stringSamples.length; i++) {
      expect(
        generateUuid(stringSamples[i], NIL_UUID, 5)
      ).toBe(
        generateUuid(stringSamples[i], 5)
      );
    }
  });
})