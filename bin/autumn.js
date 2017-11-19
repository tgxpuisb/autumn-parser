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
            convert({
                html,
                css,
                js
            }).then(result => {
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
} else {
    console.log('you can use "autumn -i xxx.vue" to compile a autumn template')
}

function parseTemplate (content) {
    let html = '',
        css = '',
        js = '',
        data = '{}'

    if (content.indexOf('<template') > -1) {
        html = content.substring(
            content.indexOf('<template') + '<template>'.length,
            content.indexOf('</template>')
        )
    }

    if (content.indexOf('<style>') > -1) {
        css = content.substring(
            content.indexOf('<style>') + '<style>'.length,
            content.indexOf('</style>')
        )
    }
    
    if (content.indexOf('<script>') > -1) {
        js = content.substring(
            content.indexOf('<script>') + '<script>'.length,
            content.indexOf('</script>')
        )
    }
    
    return {
        html,
        css,
        js
    }
}