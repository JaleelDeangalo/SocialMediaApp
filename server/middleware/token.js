const { verify } = require("jsonwebtoken")

module.exports = (req, res, next) => {

const token = req.header("x-auth-token")

if(!token) {
    return res.status(401).json({ Message: "No Token Acccess Denied" })
}

try {

    verify(token, process.env.SECRET, (error, decoded) => {
    if(error) {
        return res.status(403).json({ Message: "Token not valid" })
    } else {
        req.user = decoded.user
        next()
    }
})

} catch (error) {
    console.log(error)
    res.status(500).json({ Message: "Server Error" })
    }
}