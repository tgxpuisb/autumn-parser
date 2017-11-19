const postcss = require('postcss')
module.exports = function splitBorder (decl) {
    let values = postcss.list.space(decl.value)
    let color = values.find(value => isColor(value))
    let number = values.find(value => /^\d+px$/.test(value))
    decl.cloneAfter({
        prop: 'border-width',
        value: number
    })
    decl.cloneAfter({
        prop: 'border-color',
        value: color
    })
    decl.remove()
}
function isColor (str) {
    return /^#([0-9,a-f,A-F]{3}|[0-9,a-f,A-F]{6})$/.test(str)
}
function isNumber () {

}