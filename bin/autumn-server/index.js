#!/usr/bin/env node
const fs = require('fs')
const express = require('express')
const argv = require('yargs').argv

const convert = require('../../index')
const getIp = require('./get-ip')

if (argv.w) {
    if (fs.existsSync(argv.w)) {
        createServer(argv.w)
    } else {
        console.log('file not exist')
    }
} else {
    console.log('no watch')
    process.exit()
}

function createServer (filePath) {
    const app = express()

    app.engine('html', require('ejs').renderFile)
    app.set('view engine', 'html')   
    app.set('views', process.cwd() + '/bin/autumn-server')
    
    app.get('/index.html', function (req, res) {
        res.render('index', {
            url: 'http://' + getIp() + ':4000/autumn-template'
        }, function (err, html) {
            res.send(html)
        })
    })
    
    app.get('/autumn-template', function (req, res) {
        fs.readFile(filePath, (err, content) => {
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
                res.json(result)
            }).catch(e => {
                console.log(e)
            })
        })
    })
    console.log('server listen 4000')
    app.listen(4000)
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