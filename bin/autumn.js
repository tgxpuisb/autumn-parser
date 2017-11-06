#!/usr/bin/env node
const fs = require('fs')
const argv = require('yargs').argv

const convert = require('../index')

if (argv.i) {
    if (fs.existsSync(argv.i)) {
        fs.readFile(argv.i, (err, content) => {
            let {
                html,
                css,
                js
            } = parseTemplate(content.toString())
            convert(html, css, js).then(result => {
                let path = argv.o
                if (!path) {
                    path = argv.i.replace(/\.autumn|\.vue$/, '.json')
                }
                fs.writeFile(path, JSON.stringify(result, undefined, 4), err => {
                    if (err) {
                        console.log(err)
                    }
                })
            }).catch(e => {
                console.log(e)
            })
        })
    } else {
        console.error('input file is not exists')
    }
}

function parseTemplate (content) {
    let html = content.substring(
        content.indexOf('<template') + '<template>'.length,
        content.indexOf('</template>')
    )
    let css = content.substring(
        content.indexOf('<style>') + '<style>'.length,
        content.indexOf('</style>')
    )
    let js = content.substring(
        content.indexOf('<script>') + '<script>'.length,
        content.indexOf('</script>')
    )
    return {
        html,
        css,
        js
    }
}