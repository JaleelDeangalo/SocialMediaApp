const { verify } = require("jsonwebtoken");
const User = require("../models/User");

module.exports = function(req, res, next) {

    const token = req.header("Authorization");

    if(!token) {
        return res.status(401).json({ Message: "No Token Acccess Denied" });
    }

    try {
        verify(token, process.env.SECRET, (error, decoded) => {
            if(error) {
                return res.status(401).send({
                    success: false,
                    data: null,
                    message: "Unauthorized"
                });
            }
            req.user = decoded.user;
        });

        User.findOne({id: req.user.id}, (error, user) => {

            if(error) {
                return res.status(400).send({
                    success: false,
                    data: null,
                    message: "User not found"
                });
            }

            if(!user.isAdmin) {
                return res.status(403).send({
                    success: false,
                    data: null,
                    message: 'Forbidden'
                });
            }
        });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Server Error"});
    }
}