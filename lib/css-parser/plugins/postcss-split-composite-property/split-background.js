const postcss = require('postcss')

module.exports = function splitBackground (decl) {
    let valueTemp = postcss.list.space(decl.value)
    let color = valueTemp.find(value => /^#([0-9,a-f,A-F]{3}|[0-9,a-f,A-F]{6})|$/.test(value) || /^rgba?\(.+?\)$/.test(value))
    let url = valueTemp.find(value => /url\(.+?\)/.test(value))
    if (color) {
        decl.cloneBefore({
            prop: 'background-color',
            value: color
        })
    }
    if (url) {
        decl.cloneBefore({
            prop: 'background-image',
            value: url
        })
    }
    decl.remove()
}