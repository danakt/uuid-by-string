# UUID by string
Generating UUID based on a string

[![npm](https://img.shields.io/npm/v/uuid-by-string.svg?style=flat-square)](https://www.npmjs.com/package/uuid-by-string)
[![Travis](https://img.shields.io/travis/danakt/uuid-by-string.svg?style=flat-square)]()

## Usage
**Node.js**
```shell
npm install uuid-by-string
```
``` js
const getUuidByString = require('uuid-by-string')
console.log(getUuidByString('Some string'))
// 27FA491B-B045-4B33-A111-B38BF6F0F34C
```

**Client side**
``` html
<script src="./node_modules/uuid-by-string/src/index.js"></script>
<script>
  const getUuidByString = window.getUuidByString('Some string')
  console.log(getUuidByString('Some string'))
  // 27FA491B-B045-4B33-A111-B38BF6F0F34C
</script>
```
