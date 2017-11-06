const cssParser = require('./css-parser')
const htmlParser = require('./html-parser')


module.exports = function convert (
    html = '',
    css = '',
    js = '',
    autumnFileContent = ''
) {
    if (autumnFileContent !== '') {

    }
    return new Promise((resolve, reject) => {
        cssParser(css).then(cssString => {
            resolve({
                html: `<head><meta charset='utf-8'></head>${htmlParser.renderToHtml(htmlParser.h(html))}`,
                css: cssString,
                js: ''
            })
        })
    })
}
//renderToHtml(htmlParser(html))