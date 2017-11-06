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

/*
fs.readFile('./test-example.css', (err, content) => {
    postcss([
        // plugins
        postcssOverflow(),
        postcssSplit(),
        postcssBackgroundImage(),
        postcssPrefixAutumn(),
        postcssTransformUnit({
            baseWidth: 750
        })
    ])
    .process(content, {
        from: './test-example.css',
        to: './result.css'
    })
    .then(result => {
        result.root.walkRules(rule => {
            cssObject[rule.selector] = {}
            rule.walkDecls(declare => {
                cssObject[rule.selector][declare.prop] = declare.value
            })
        })
        console.log(cssObject)
        fs.writeFile('./result.css', result.css)
    })
    .catch(e => {
        console.log(e)
    })
})
*/

module.exports = function renderCSS (cssString) {
    return new Promise((resolve, reject) => {
        postcss([
            // plugins
            postcssOverflow(),
            postcssSplit(),
            postcssBackgroundImage(),
            postcssPrefixAutumn(),
            postcssTransformUnit({
                baseWidth: 750
            })
        ])
        .process(cssString)
        .then(result => {
            var cssObject = {}
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