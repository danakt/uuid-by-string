# UUID by string
Generating UUID based on string  

[![npm](https://img.shields.io/npm/v/uuid-by-string.svg?style=flat-square)](https://www.npmjs.com/package/uuid-by-string)
[![Travis](https://img.shields.io/travis/danakt/uuid-by-string.svg?style=flat-square)]()

## Usage
**Node.js**
```shell
npm install uuid-by-string
```
``` js
const getUUID = require('uuid-by-string');

console.log(getUUID('Some string'));
// -> 27FA491B-B045-4B33-A111-B38BF6F0F34C
```

**Client side**
``` html
<script src="uuid-by-string.js"></script>
<script>
    console.log(getUUID('Some string'));
    // -> 27FA491B-B045-4B33-A111-B38BF6F0F34C
</script>
```
