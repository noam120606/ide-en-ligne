const fs = require('fs')
module.exports = {
    url: '/profile/*',
    execute: async (req, res) => {
        let account = JSON.parse(fs.readFileSync('./storage/accounts.json')).filter(a => a.name == req.url.split("/")[2])
        if (account.length < 1) {
            fs.readFile('pages/404.html', 'utf8', function(err, data) {
                return res.send(data)
            })
        } else {
            res.send("page profile de "+req.url.split("/")[2])
        }
    }
}