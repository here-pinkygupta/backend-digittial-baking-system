const express= require("express")
const accountModel = require("../models/account.model")

async function createAccountController(req, res) {

    const existingAccount = await accountModel.findOne({
        user: req.user._id
    })

    if (existingAccount) {
        return res.status(400).json({
            message: "Account already exists."
        })
    }

    const account = await accountModel.create({
        user: req.user._id
    })

    return res.status(201).json({
        account
    })
}

async function getUserAccountsController(req, res) {

    
    const accounts = await accountModel.find({  user: req.user._id });
  

    res.status(200).json({
        accounts
    })

    
}

async function getAccountBalanceController(req, res) {

    const { accountId } = req.params;

    console.log("Param accountId =", accountId);
    console.log("Logged in user =", req.user._id);

    const account = await accountModel.findOne({
        _id: accountId,
        user: req.user._id
    });

    console.log("Account found =", account);

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    const balance = await account.getBalance();

    return res.status(200).json({
        _id: accountId,
        balance
    });
}





module.exports={createAccountController,getUserAccountsController,getAccountBalanceController}