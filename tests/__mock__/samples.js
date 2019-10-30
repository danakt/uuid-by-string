const { longText } = require('./longText');

module.exports.samples = [
  {
    title: 'empty string',
    // prettier-ignore
    md5Hash: new Uint8Array([212, 29, 140, 217, 143, 0, 178, 4, 233, 128, 9, 152, 236, 248, 66, 126]),
    // prettier-ignore
    sha1Hash: new Uint8Array([218, 57, 163, 238, 94, 107, 75, 13, 50, 85, 191, 239, 149, 96, 24, 144, 175, 216, 7, 9]),
    uuidV3: 'd41d8cd9-8f00-3204-a980-0998ecf8427e',
    uuidV5: 'da39a3ee-5e6b-5b0d-b255-bfef95601890',
    string: ''
  },
  {
    title: 'hello world',
    // prettier-ignore
    md5Hash: new Uint8Array([134, 251, 38, 157, 25, 13, 44, 133, 246, 224, 70, 140, 236, 164, 42, 32]),
    // prettier-ignore
    sha1Hash: new Uint8Array([211, 72, 106, 233, 19, 110, 120, 86, 188, 66, 33, 35, 133, 234, 121, 112, 148, 71, 88, 2]),
    uuidV3: '86fb269d-190d-3c85-b6e0-468ceca42a20',
    uuidV5: 'd3486ae9-136e-5856-bc42-212385ea7970',
    string: 'Hello world!'
  },
  {
    title: 'lorem ipsum',
    // prettier-ignore
    md5Hash: new Uint8Array([9, 86, 210, 251, 213, 213, 194, 152, 68, 164, 210, 30, 210, 247, 110, 12]),
    // prettier-ignore
    sha1Hash: new Uint8Array([148, 145, 43, 232, 179, 251, 71, 212, 22, 30, 165, 14, 89, 72, 198, 41, 106, 246, 202, 5]),
    uuidV3: '0956d2fb-d5d5-3298-84a4-d21ed2f76e0c',
    uuidV5: '94912be8-b3fb-57d4-961e-a50e5948c629',
    string: 'Lorem ipsum'
  },
  {
    title: 'utf-8 string',
    // prettier-ignore
    md5Hash: new Uint8Array([255, 109, 147, 96, 22, 99, 155, 111, 152, 42, 40, 37, 1, 169, 126, 95]),
    // prettier-ignore
    sha1Hash: new Uint8Array([225, 70, 73, 235, 192, 80, 48, 30, 126, 216, 8, 32, 144, 141, 196, 4, 176, 37, 113, 239]),
    uuidV3: 'ff6d9360-1663-3b6f-982a-282501a97e5f',
    uuidV5: 'e14649eb-c050-501e-bed8-0820908dc404',
    string:
      'ヒューマニズムは、イデオロギー的ヒューマニズムを発見します。多くの国では、フランスの最も例示的な例その中で、個人崇拝は政治文化の英米の種類を証明しています。社会経済発展は、伝統的な概念によると、国民投票を決定します。特に政治的不安定の状態でパワーのメカニズム、不均一。それは逆説的に見えるかもしれませんように政治的な紛争管理は、一意の機能キリスト教民主主義ナショナリズムです。近代化の概念は、マルクス主義を証明しています。'
  },
  {
    title: 'very long string',
    // prettier-ignore
    md5Hash: new Uint8Array([52, 229, 134, 18, 32, 250, 249, 120, 187, 225, 101, 107, 52, 171, 47, 47]),
    // prettier-ignore
    sha1Hash: new Uint8Array([200, 19, 134, 199, 116, 79, 170, 249, 72, 153, 207, 221, 20, 102, 74, 167, 202, 90, 145, 223]),
    uuidV3: '34e58612-20fa-3978-bbe1-656b34ab2f2f',
    uuidV5: 'c81386c7-744f-5af9-8899-cfdd14664aa7',
    string: longText
  }
];
