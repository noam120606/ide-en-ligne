const fs = require('fs')
const redirect = require('../functions/redirect')
module.exports = {
    url: '/login',
    execute: async (req, res) => {
        res.set('Content-Type', 'text/html');
        const accounts = JSON.parse(fs.readFileSync('./storage/accounts.json'))
        let token = req.cookies.token
        console.log(token)
        if (!token) {
            let username = req.query.username
            fs.readFile('pages/login.html', 'utf8', function(err, data) {
                if (!username) {
                    res.send(data.replaceAll("[erreur]", "").replaceAll("localhost:8000", process.env.HOSTNAME));
                } else {
                    let password = req.query.password
                    let account = accounts.filter(acc => acc.name == username)
                    if (account.length < 1) return res.send(data.replaceAll("[erreur]", "Identifiant invalide").replaceAll("localhost:8000", process.env.HOSTNAME));
                    if (account[0].password != password) return res.send(data.replaceAll("[erreur]", "Mot de passe invalide").replaceAll("localhost:8000", process.env.HOSTNAME));
                    let newToken = require("../functions/generateToken")(64)
                    fs.readFile("./storage/tokens.json", (error, data) => {
                        const parsedData = JSON.parse(data);
                        parsedData.push({token: newToken, expires: Date.now()+86400000, account: username})
                        fs.writeFile("./storage/tokens.json", JSON.stringify(parsedData, null, 2), (err) => {});
                    });
                    res.cookie('token', token, { maxAge: 900000, httpOnly: true })
                    redirect(res, `/profile/${username}`)
                }
            });
        } else {
            let tokens = JSON.parse(fs.readFileSync('./storage/tokens.json'))
            console.log(tokens)
            let found_token = tokens.filter(t => t.token == token)
            console.log(found_token)
            if (found_token.length < 1) return invalid_token()
            if (found_token[0].expires < Date.now()) return invalid_token()
            res.cookie('token', found_token[0].token, { maxAge: 900000, httpOnly: true })
            redirect(res, `/profile/${found_token[0].account}`)
            function invalid_token() {
                res.clearCookie('token');
                redirect(res, `/login`)
            }
        }
    }
}