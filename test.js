const parser = require('./index')
const fs = require('fs')


// fs.watchFile('./test/example/index.html', () => {
    let css = fs.readFileSync('./test/example/index.css', 'utf8')
    let html = fs.readFileSync('./test/example/index.html', 'utf8')
    parser(html, css).then(result => {
        fs.writeFile('./test/json/test4.json', JSON.stringify(result, undefined, 4))
    })
// })

