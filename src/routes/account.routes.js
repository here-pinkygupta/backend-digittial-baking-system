const express = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const accountController = require("../controllers/account.controller")
const router = express.Router()


//post- /api/accounts
router.post("/", authMiddleware.authMiddleware, accountController.createAccountController)


//get- /api/accounts
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountsController)



//get- /api/accounts/balance/:accountId
router.get("/balance/:accountId", authMiddleware.authMiddleware, accountController.getAccountBalanceController)

module.exports= router