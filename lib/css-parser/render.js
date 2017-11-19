const fs = require('fs')
const postcss = require('postcss')

// overflow:hidden -> clips-to-bounds
const postcssOverflow = require('./plugins/postcss-overflow')
// split
const postcssSplit = require('./plugins/postcss-split-composite-property/index.js')
// update background image
const postcssBackgroundImage = require('./plugins/postcss-background-image')
// prefix autumn
const postcssPrefixAutumn = require('./plugins/postcss-prefix-autumn')
// transform unit
const postcssTransformUnit = require('./plugins/postcss-transform-unit')
// autofix content-mode
const postcssContentMode = require('./plugins/postcss-content-mode')
// color-convert
const postcssColorConvert = require('./plugins/postcss-color')

module.exports = function (cssString, htmlTree = []) {
    return new Promise((resolve, reject) => {
        postcss([
            // plugins
            postcssContentMode({
                htmlTree
            }),
            postcssOverflow(),
            postcssSplit(),
            postcssBackgroundImage(),
            postcssPrefixAutumn(),
            postcssColorConvert(),
            postcssTransformUnit({
                baseWidth: 750
            })
        ])
        .process(cssString)
        .then(result => {
            let cssObject = {}
            result.root.walkRules(rule => {
                cssObject[rule.selector] = {}
                rule.walkDecls(declare => {
                    cssObject[rule.selector][declare.prop] = declare.value
                })
            })
            resolve(cssObject)
        })
        .catch(e => {
            reject(e)
        })
    })
}