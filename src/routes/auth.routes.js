const express = require("express")
const userController = require("../controllers/user.controller")
const router = express()

// /api/auth/register
router.post("/register", userController.userRegisterController)

// /api/auth/login
router.post("/login", userController.userLoginController)


// /api/auth/logout
router.get("/logout", userController.userLogoutController)


module.exports= router