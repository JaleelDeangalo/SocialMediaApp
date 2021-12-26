const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const  { secret } = require("../config/keys")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const gravatar = require("gravatar")
const normalizeUrl = require("normalize-url")

const login = async (req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { email, password } = req.body

    try {
        
        const user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({Message: "Email or password is invalid"})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched) {
            return res.status(400).json({ Message: " Email or password is invalid"})
        }

        const Payload = {
            user: {
                id: user.id
            },
            email,
            password
        }

        jwt.sign(Payload, secret, { expiresIn: 3600000}, (error, token) => {
            if(error) {
                throw error
            } 

            res.json({token})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

const signUp = async(req, res) => {


    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({Message: errors.array()})
    }

    const { username, email, password } = req.body

    try {
        
        let user = await User.findOne({ email })
        if(user) {
            return res.status(400).json({Message: "Email is in use"})
        }


        const avatar = normalizeUrl(
            gravatar.url(email, {
                s:"200",
                r:"pg",
                d:"mm"
            })
        )

        user = new User({
            username,
            email,
            password,
            avatar
        })


        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const Payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(Payload, secret, {expiresIn:360000}, (error, token) => {
        
              if(error) {
                throw error
             } 
            
             res.json({token})

    })

      }  catch (error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
}

const logout = async(req, res) => {

    try {
         await res.clearCookie(req.user.id)
        res.json({Message: "Signout Success"})
    } catch(error) {
        console.log(error)
        res.status(500).json({Message: "Server Error"})
    }
  
}


module.exports = { login, signUp, logout }