const express = require("express")
const {signUp, signIn,isAuthenticate, getUserInfo,googleLogin} = require("../controllers/auth")
const router = express.Router()

router.get("/user/:id",getUserInfo)
router.post("/signup",signUp)
router.post("/signin", signIn)
router.post("/google-login", googleLogin)
router.get("/authentication", isAuthenticate)

module.exports = router