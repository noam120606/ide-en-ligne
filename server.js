require('dotenv').config({path:"./.env"})
const fs = require('fs')
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use('/codemirror', express.static(require('path').join(__dirname, 'codemirror')))

server.listen(port, () => {
    console.log('Server app listening on port ' + port);
});

io.on('connection', (socket) => {
    socket.id = require('./functions/generateToken')(8)
    console.log(`[Connection] ${socket.id}`)
    require("./socket_handler/-onjoin")(socket)
    fs.readdirSync("./socket_handler").filter(f => f.endsWith(".js")).filter(f => !f.startsWith("-")).forEach(async file => {
        let func = require(`./socket_handler/${file}`)
        socket.on(func.name, func.execute.bind(null, socket))
    })
});


fs.readdirSync("./server_get").filter(f => f.endsWith(".js")).forEach(async file => {
    let get = require(`./server_get/${file}`)
    app.get(get.url, get.execute.bind(null))
})
app.get("*", (req, res) => {
    fs.readFile('pages/404.html', 'utf8', function(err, data) {
        res.send(data)
    })
})


/*
process.on("unhandledRejection", (e) => { console.error(e) })
process.on("uncaughtException", (e) => { console.error(e) })
process.on("uncaughtExceptionMonitor", (e) => { console.error(e) })
*/