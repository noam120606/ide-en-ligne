module.exports = {
    name: "token",
    execute: async (socket) => {
        socket.emit('token', socket.id)
    }
}