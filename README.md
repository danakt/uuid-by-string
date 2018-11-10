uuid-by-string
[![NPM](https://img.shields.io/npm/v/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Downloads](https://img.shields.io/npm/dw/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Build Status](https://img.shields.io/travis/danakt/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/danakt/uuid-by-string)
=======================
Generates the [RFC-4122](https://tools.ietf.org/html/rfc4122#section-4.3) Name-Based UUID v3 and v5 hashes.

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
import getUuid from 'uuid-by-string'

const uuidHash = getUuid('Hello world!')
// 86fb269d-190d-1e85-b6e0-468ceca42a20
```

The string `Hello world!` will always returns `86fb269d-190d-1e85-b6e0-468ceca42a20`.

## License

[MIT licensed](LICENSE)
