module.exports = (length) => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    token = ""
    for (let i = 0; i<length; i++) {
        token+=chars[Math.floor(Math.random() * chars.length)]
    }
    return token
}