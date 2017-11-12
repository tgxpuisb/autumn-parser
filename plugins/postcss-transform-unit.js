const postcss = require('postcss')
const adaptProps = /width|height|padding|margin|border|top|left|right|bottom/
module.exports = postcss.plugin('transform-unit', options => {
    let baseWidth = options.baseWidth
    return function(root){
        root.walkDecls(declare => {
            if (/px/.test(declare.value) && adaptProps.test(declare.prop)) {
                declare.value = declare.value.replace('px', `*100vw/${baseWidth}`)
            }
        })
    }
})