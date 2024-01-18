const fs = require('fs')
module.exports = (path, json=true) => {
    fs.readFile(path, 'utf8', function(err, data) {
        return json?JSON.parse(data):data
    })    
}