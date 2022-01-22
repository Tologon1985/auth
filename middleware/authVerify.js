const jwt = require("jsonwebtoken")

module.exports = function (req, res , next) {
    const token = req.header("auth-token")
    if(!token) return res.status(401).send("Acces Denied")
    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    }catch (e) {
        res.status(400).send("Invalid Token")
    }
}