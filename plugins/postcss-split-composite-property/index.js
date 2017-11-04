const postcss = require('postcss')
const splitPadding = require('./split-padding')
const splitMargin = require('./split-margin')
const splitBorder = require('./split-border')
const splitFlex = require('./split-flex')
const splitBackground = require('./split-background')




module.exports = postcss.plugin('split-composite-property', options => {
    return function (root) {
        root.walkDecls(decl => {
            if (decl.prop === 'padding') {
                splitPadding(decl)
            }
            if (decl.prop === 'margin') {
                splitMargin(decl)
            }
            if (decl.prop === 'border') {
                splitBorder(decl)
            }
            if (decl.prop === 'flex') {
                splitFlex(decl)
            }
            if (decl.prop === 'background') {
                splitBackground(decl)
            }
        })
    }
})