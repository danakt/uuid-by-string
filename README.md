uuid-by-string
[![NPM](https://img.shields.io/npm/v/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Downloads](https://img.shields.io/npm/dw/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/uuid-by-string)
[![Build Status](https://img.shields.io/travis/danakt/uuid-by-string.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/danakt/uuid-by-string)
=======================

Generates uuid-hash from string

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
const getUuidByString = require('uuid-by-string')

const uuidHash = getUuidByString('Some string')
// 27FA491B-B045-4B33-A111-B38BF6F0F34C
```

The string `Some string` will always returns `27FA491B-B045-4B33-A111-B38BF6F0F34C`

Also, you can use the package in browser without installing:

```html
<script src="https://unpkg.com/uuid-by-string/index.js"></script>
<script>
  const uuidHash = window.getUuidByString('Some string')
  // 27FA491B-B045-4B33-A111-B38BF6F0F34C
</script>
```

## License

[MIT licensed](LICENSE)
