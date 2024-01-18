const fs = require('fs')
module.exports = {
    url: '/editor',
    execute: async (req, res) => {
        res.set('Content-Type', 'text/html');
        fs.readFile('pages/editor.html', 'utf8', function(err, data){
            res.send(data.replaceAll(`"codemirror/`,`"http://${process.env.CODEMIRORHOST}/codemirror/`).replaceAll("localhost:8000", process.env.HOSTNAME).replaceAll("[console]","").replaceAll("[code]",`print("ok")`));
        });
    }
}