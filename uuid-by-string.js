/**
 * Сниппет для генерации UUID с привязкой к строке
 * @author Danakt Frost <github.com/danakt/uuid-by-string>
 *
 * @function getUUIDByString
 * @param {string} str Строка для получения UUID
 * @returns {string} UUID в формате «XXXXXXXX-XXXX-4XXX-YXXX-XXXXXXXXXXXX»
 */

!function(){
    let UUID = getUUIDByString('Допустим, какая-то строка');
    console.log(UUID);
}();

function getUUIDByString(str){
    function getHex(str, key, maxlen){
        let n = i = count = 1;
        str = str.trim();

        // NOTE: 14-значное число в hex равно 16-значному в base-10,
        // в свою очередь, js округляет всё, что идёт после 16-го знака в числе
        maxlen = Math.min(maxlen || 14, 14);

        for(; true; i++){
            if(count++ >= str.length && n.toString(16).length >= maxlen)
                break;
            if(str[i] === undefined)
                i = 0;

            n *= (str.charCodeAt(i) + (i * str.length)) * key;
            n = Number(String(n).replace(/0+$/g, ''));

            while(n.toString(16).length > maxlen)
                n = Math.floor(n/10);
        }

        return n.toString(16);
    }

    function makeUUID(p /* p = Array[3] */){
        let s = [
            p[0],
            p[1].substr(0, 4),
            4 + p[1].substr(4, 7),
            (Number('0x'+ p[1][7]) & 0x3 | 0x8).toString(16)
                + p[1].substr(8, 11),
            p[2]
        ];

        return s.join('-').toUpperCase();
    }

    return makeUUID([
        getHex(str, 0xf6, 8),
        getHex(str, 0x51c, 11),
        getHex(str, 0xd7a, 12)
    ]);
}

if(exports !== undefined){
    if(module !== undefined && module.exports)
        exports = module.exports = getUUIDByString;

    exports.getUUIDByString = getUUIDByString;
}
