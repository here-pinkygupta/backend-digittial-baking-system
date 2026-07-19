const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/email.service")
const blacklistModel = require("../models/blacklist.model")

async function userRegisterController(req,res){
    const {email, password,name} = req.body


    const isExits = await userModel.findOne({
        email: email
    })

    if (isExits ){
        res.status(422).json({
            message: "This email already exits! use another email account"
        })
    }

    const user = await userModel.create({
        email,password,name
    })

    const token= jwt.sign({userId: user._id},process.env.JWT_SECRET_KEY, {expiresIn:"3d"})

    res.cookie("token", token)

    res.status(201).json({
        user:{
            id: user._id,
            email: user.email,
            name: user.name
        },
        token,
        message:"User created Sucessfully!!"
    })

    await emailService.sendRegistrationEmail(user.email, user.name)
}

async function userLoginController(req,res){
    const {email, password} = req.body

    const user = await userModel.findOne({email:email}).select("+password")

    if(!user){
        return res.status(401).json({
            message: "user or password is invalid"
        })
    }

    const isPasswordValid = user.comparePassword(password)

    if(!isPasswordValid){
        return res.status(401).json({
            message: "user or password is invalid"
        })
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    res.cookie("token", token)

    res.status(200).json({
        user: {
            id:user._id,
            email: user.email,
            name: user.name
        },
        token,
        message:"User loged in Sucessfully!!"
    })
}


async function userLogoutController(req,res){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(200).json({
            message: "User Logout SucessFullyy!!!"
        })
    }


    res.clearCookie("token")


    await blacklistModel.create({token:token})

    
    res.status(200).json({
        message: "User Logout SucessFullyy!!!"
    })

}
module.exports = {userLoginController, userRegisterController, userLogoutController}