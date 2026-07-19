const transactionController= require("../controllers/transaction.controller")
const express= require("express")
const authMiddleware=require("../middleware/auth.middleware")


const transactionRoutes = express.Router()


//post - /api/transactions/
transactionRoutes.post("/",authMiddleware.authMiddleware, transactionController.createTransactionController)


//post - /api/transactions/system/inital-funds
transactionRoutes.post("/system/inital-funds", authMiddleware.authSystemUserMiddleware, transactionController.createInitialFundsTransaction)

module.exports=transactionRoutes