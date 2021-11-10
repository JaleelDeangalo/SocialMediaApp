const express = require("express")
const { check } = require("express-validator")
const { login, logout, signUp } = require("../../controllers/auth")
const router = express.Router()
const auth = require("../../middleware/token")

router.get("/logout", auth, logout)

router.post("/signup", 
[
    check("username", "Username is required").notEmpty(),
    check("email", "Email is required").isEmail().notEmpty(),
    check("password", "Password must be 6 or more charaters").isLength({min:6})
],
signUp)

router.post("/login", 
[
    check("email", "Email is required").isEmail().notEmpty(),
    check("password","Password is required").notEmpty()
],
 login)

module.exports = router


