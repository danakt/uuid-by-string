uuid-by-string
[![NPM](https://img.shields.io/npm/v/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Downloads](https://img.shields.io/npm/dw/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Build Status](https://img.shields.io/travis/danakt/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/danakt/uuid-by-string)
=======================
Generates the [RFC-4122](https://tools.ietf.org/html/rfc4122#section-4.3) Name-Based UUID. Supports 3 and 5 versions of UUID.

## Installation

```bash
# via NPM
npm install uuid-by-string

# or Yarn
yarn add uuid-by-string
```

## Usage

The package has only one default exported method. Method receives any string and returns generated hash

```js
const getUuid = require('uuid-by-string');

const uuidHash = getUuid('Hello world!');
// d3486ae9-136e-5856-bc42-212385ea7970
```

The string `Hello world!` will always returns `d3486ae9-136e-5856-bc42-212385ea7970`.

You can specify the UUID version. Available versions is 3 and 5 according to [RFC-4122](https://tools.ietf.org/html/rfc4122#section-4.3). The version is responsible for the hashing algorithm: version 3 uses MD5, and version 5 uses SHA-1. SHA-1 used by default if version is not specified.

```js
const uuidV3Hash = getUuid('Hello world!', 3);
// 86fb269d-190d-3c85-b6e0-468ceca42a20

const uuidV5Hash = getUuid('Hello world!', 5);
// d3486ae9-136e-5856-bc42-212385ea7970
```

## API

`getUuid(name [, version]);`

`getUuid(name [, namespace, version]);`

- `name` — hashing target
- `namespace` _Optional_ — namespace in which generation occurs
- `version` _Optional_ — 3 or 5, version of UUID

## License

[MIT licensed](LICENSE)
