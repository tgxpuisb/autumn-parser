const postcss = require('postcss')
module.exports = function splitMargin (decl) {
    const marginProperties = [
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left'
    ]
    let values = postcss.list.space(decl.value)
    marginProperties.forEach((property, index) => {
        let value = values[index % values.length]
        if (values.length === 3 && index === 3) {
            // 对于margin: 20 10 20; 属性拆分时候的修正
            value = values[1]
        }
        decl.cloneAfter({
            value,
            prop: property
        })
    })
    decl.remove()
}