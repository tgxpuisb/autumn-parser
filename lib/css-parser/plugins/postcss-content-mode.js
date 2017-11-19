const postcss = require('postcss')
module.exports = postcss.plugin('content-mode', options => {
    return function (root) {
        if (options.htmlTree) {
            let needAddContentModeClass = []
            options.htmlTree.forEach(tree => {
                if (tree.name === 'img' && tree.class && tree.class[0]) {
                    needAddContentModeClass.push('.' + tree.class)
                }
            })
            root.walkRules(rule => {
                if (needAddContentModeClass.indexOf(rule.selector) > -1) {
                    let hasContentModel = false
                    rule.walkDecls(/content-mode/, () => {
                        hasContentModel = true
                    })
                    if (!hasContentModel) {
                        rule.append(postcss.decl({
                            prop: 'content-mode',
                            value: 'scale-fill'
                        }))
                    }
                }  
            })
        }
    }
})