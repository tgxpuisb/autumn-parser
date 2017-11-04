const postcss = require('postcss')
module.exports = function splitFlex (decl) {
    const flexProperties = [
        'flex-grow',
        'flex-shrink'
    ]
    let values = postcss.list.space(decl.value)
    flexProperties.forEach((prop, index) => {
        let value = values[index]
        if (value) {
            decl.cloneAfter({
                prop,
                value
            })
        }
    })
}