const fs = require('fs')
const path = require('path')


function readFile(file) {
    return fs.readFileSync(path.resolve(__dirname + '/..' + file), 'utf8')
}

exports.readFile = readFile;