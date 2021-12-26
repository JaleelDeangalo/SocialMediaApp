const jwt = require("jsonwebtoken")
const JWT = require("../config/keys").secret


const auth = async(req, res, next) => {

const token = req.header("x-auth-token")

if(!token) {
    return res.status(401).json({Message: "No Token Acccess Denied"})
}

try {
    
    jwt.verify(token, JWT, (error, decoded) => {
    if(error) {
        return res.status(401).json({Message: "Token not valid"})
    } else {
        req.user = decoded.user
        next()
    }
})

} catch (error) {
    console.log(error)
    res.status(500).json({Message: "Server Error"})
}

}

module.exports = { auth }