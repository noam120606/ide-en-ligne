const fs = require('fs')
module.exports = async (socket) => {
    fs.readFile('cache.py', 'utf8', function(err, text) {
        socket.emit('text', { userId: socket.id, text });
    })
}