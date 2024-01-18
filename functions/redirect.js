const fs = require('fs')
module.exports = (res, path) => {
    fs.readFile('protocols/redirect.html', 'utf8', function(err, page) {
        if (err) return console.error(err)
        res.send(page.replaceAll("[path]", path));
    })  
}