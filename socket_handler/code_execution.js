const fs = require('fs')
const {spawn} = require('child_process');

module.exports = {
    name: "exe_send",
    execute: async (socket, code) => {
        fs.writeFile('cache.py', code, err => {if(err)console.error(err)});
        const python = spawn('python', ['cache.py']).on('error', function(err) { console.error(err) })
        python.stdout.on('data', return_site);
        python.stderr.on('data', return_site);
        function return_site(data) {
            console.log(data)
            let result = new TextDecoder("utf-8").decode(new Uint8Array(data)).split("\n")
            console.log(result)
            socket.emit("exe_result", result)
        }
    }
}