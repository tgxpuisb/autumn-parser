const postcss = require('postcss')
module.exports = postcss.plugin('transform-unit', options => {
    let baseWidth = options.baseWidth
    return function(root){
        root.walkDecls(declare => {
            if(/px/.test(declare.value)){
                declare.value = declare.value.replace('px', `*100vw/${baseWidth}`)
            }
        })
    }
})