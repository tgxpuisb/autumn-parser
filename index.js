const htmlParser = require('./lib/html-parser/parser')
const {
    renderToHtml
} = require('./lib/html-parser/util')
const cssConvert = require('./lib/css-parser/render')

module.exports = function convert ({
    html = '',
    css = '',
    js = '',
    data = {}
} = {}) {
    return new Promise((resolve, reject) => {
        let htmlTree = htmlParser(html)
        cssConvert(css, htmlTree).then(cssObject => {
            resolve({
                html: `<head><meta charset='utf-8'></head>${renderToHtml(htmlTree[0])}`,
                css: cssObject,
                js,
                data
            })
        }).catch(e => {
            console.log(e)
        })
    })
}