const postcss = require('postcss')
module.exports = postcss.plugin('backgroud-image', options => {
    return function (root) {
        root.walkDecls(decl => {
            if(/background-image/.test(decl.prop)){
                decl.value = `${decl.value.split('(')[1].replace(')', '')}`
            }
        })
    }
})