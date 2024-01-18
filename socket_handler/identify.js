const fs = require("fs")
module.exports = {
    name: "identify",
    execute: async (socket, data) => {
        let token = JSON.parse(fs.readFileSync('./storage/tokens.json')).filter(t => t.token == data)
        if (token.length < 1) return invalid_login()
        if (token[0].expires < Date.now()) return invalid_login()
        let user = JSON.parse(fs.readFileSync('./storage/accounts.json')).filter(u => u.name = token[0].account)
        if (user.length < 1) return invalid_login()
        socket.identity = {
            token: data,
            name: user[0].name,
            projects: user[0].projects,
            admin: user[0].admin
        }
        console.log(socket.identity)
        function invalid_login() {
            socket.emit('no_login')
        }
    }
}