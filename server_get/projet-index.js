const fs = require('fs')
module.exports = {
    url: '/projet/',
    execute: async (req, res) => {
        res.send("page liste projets")
    }
}