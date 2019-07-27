var fs = require('fs')
var express = require('express')
var path = require('path')
var app = express()
var port = process.env.HTTP_PORT || 8088
var publicDir = path.resolve(process.env.PUBLIC_PATH || __dirname)
var indexFile = process.env.INDEX || 'index.html'

app.use('/', express.static(publicDir))
app.get('/*', (req, res) => {
    fs.readFile(path.join(publicDir, indexFile), (_, data) => {
        res.type('html').send(data)
    })
})

app.listen(process.env.GET || port)
console.log(`Start hosting from ${publicDir}`, `\nServer is running on port ${port}`, '...')