const express = require('express')
const app = express()

// static
app.use('/json', express.static('./json', {
    lastModified: false,
    etag: false
}))

app.get('/example/:name', (req, res) => {
    let ua = req.header('User-Agent')
    if (/Darwin/i.test(ua)) {

    } else {

    }
    res.json({})
})

console.log('autumn project listened on 4000')
app.listen(4000)