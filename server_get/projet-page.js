const fs = require('fs')
module.exports = {
    url: '/projet/*',
    execute: async (req, res) => {
        if (!fs.existsSync(`projects/${req.url.split("/")[2]}`)) {
            fs.readFile('pages/404.html', 'utf8', function(err, data) {
                return res.send(data)
            })
        } else {
            let projet = {
                name: req.url.split("/")[2],
                editor: req.url.split("/")[3] == "editor" ? true : false,
                properties: JSON.parse(fs.readFileSync(`./projects/${req.url.split("/")[2]}/properties.json`))
            }
            if (projet.editor) {
                res.set('Content-Type', 'text/html');
                fs.readFile('pages/editor.html', 'utf8', function(err, data){
                    res.send(data.replaceAll(`"codemirror/`,`"http://${process.env.CODEMIRORHOST}/codemirror/`).replaceAll("localhost:8000", process.env.HOSTNAME).replaceAll("[console]","").replaceAll("[projectname]",projet.name));
                });
            } else {
                memberList = `<ul><li><a href="http://${process.env.HOSTNAME}/profile/${projet.properties.owner}">${projet.properties.owner}</a> (Propriétaire)</li>`
                projet.properties.members.forEach(member => {
                    memberList += `<li><a href="http://${process.env.HOSTNAME}/profile/${member.username}">${member.username}</a> (${member.perm})</li>`
                });
                fs.readFile('pages/projet-info.html', 'utf8', function(err, site) {
                    res.send(site.replaceAll("[projectname]", req.url.split("/")[2]).replaceAll("[members]", `${memberList}</ul>`));
                })
            }
        }
    }
}