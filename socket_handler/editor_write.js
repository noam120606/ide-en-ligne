const fs = require("fs")
module.exports = {
    name: "edit",
    execute: async (socket, data) => {
        const { origine, text } = data;
        socket.broadcast.emit('text', { origine, text });
        fs.writeFile('cache.py', text, err => {if (err) console.error(err)});
    }
}