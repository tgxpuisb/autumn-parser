/**
 * 在css层面支持color:#123456;，同时也支持rgba，rgb，不支持hsl。
 * 会把rgba 转换成客户端的color:aabbccdd;
 */
const postcss = require('postcss')

function zeroFill (str) {
    if (str.length === 1) {
        return '0' + str
    }
    return str
}

function handleColorString (colorString) {
    let hexString = '#'
    if (/^rgba?\((.+?)\)$/.test(colorString)) {
        let values = RegExp.$1.split(',').map(value => value.replace(/\s/, ''))
        if (values.length === 4) {
            hexString += zeroFill(Math.floor(+values.pop() * 255).toString(16))
        }
        values.forEach(value => {
            hexString += zeroFill((+value).toString(16))
        })
    } else {
        if (/^#[0-9,a-f,A-F]{3}$/.test(colorString)) {
            hexString = colorString.replace(/([0-9,a-f,A-F])/g, '$1$1')
        } else {
            hexString = colorString
        }
    }
    return hexString.toUpperCase()
}

module.exports = postcss.plugin('color-convert', options => {
    return function (root) {
        root.walkDecls(decl => {
            if (/background-color|color/.test(decl.prop)) {
                decl.value = handleColorString(decl.value)
            }
        })
    }
})