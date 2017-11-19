const postcss = require('postcss')
module.exports = function splitPadding (decl) {
    const paddingProperties = [
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left'
    ]
    let values = postcss.list.space(decl.value)
    paddingProperties.forEach((property, index) => {
        let value = values[index % values.length]
        if (values.length === 3 && index === 3) {
            // 对于padding: 20 10 20; 属性拆分时候的修正
            value = values[1]
        }
        decl.cloneAfter({
            value,
            prop: property
        })
    })
    decl.remove()
}