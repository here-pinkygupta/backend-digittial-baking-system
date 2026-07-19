const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const cookieParser = require("cookie-parser")
const accountRouter = require("../src/routes/account.routes")
const transactionRouter = require("../src/routes/transaction.routes.js")

const app = express()

app.use(express.json())
app.use(cookieParser())

//routes required
app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)
app.use("/api/transactions", transactionRouter)

module.exports=app