const postcss = require('postcss')
module.exports = postcss.plugin('autumn-prefix', function(option){
    return function(root){
        root.walkDecls((declare) => {
            if(/^width|^height|^padding|^margin|^border-radius|^top|^left|^right|^bottom/.test(declare.prop)){
                declare.cloneBefore({ prop: '-autumn-' + declare.prop })
                declare.remove()
            }
        })
    }
})