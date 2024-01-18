const fs = require('fs')
module.exports = {
    url: '/',
    execute: async (req, res) => {
        res.set('Content-Type', 'text/html');
        res.send("racine")
    }
}