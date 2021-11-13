const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

async function login(req, res) {

    // Checks if email and password exists or is valid
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { email, password } = req.body

    try {
        
        // Queries User Model for email
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({Message: "Email or password is invalid"})
        }

        // Compares input password with hashes password
        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched) {
            return res.status(400).json({ Message: " Email or password is invalid"})
        }

        // Stores token in user.id
        const Payload = {
            user: {
                id: user.id
            },
            email,
            password
        }

        jwt.sign(Payload, process.env.SECRET, function(error, token) {

            if(error) {
                throw error
            }
            
            res.status(200).json({token})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

 async function signUp(req, res) {


    // Checks if username, email and password exists or is valid
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { username, email, password } = req.body

    try {
        
        // Queries User model for E input email
        let user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({Message: "Email is in use"})
        }

        // Sets Default Avatar
        const avatar = "https://www.teenwiseseattle.com/wp-content/uploads/2017/04/default_avatar.png"

        user = new User({
            username,
            email,
            password,
            avatar
        })

        // Hashes input password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        // Saves token in user.id
        const Payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(Payload, process.env.SECRET, function(error, token) {

              if(error) {
                throw error
             } 

             res.status(200).json({token})

    })

      }  catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}


// For client web apps only
async function logout(req, res) {

    try {
         await res.clearCookie(req.user.id)
        res.json({Message: "Signout Success"})
    } catch(error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
  
}


module.exports = { login, signUp, logout }