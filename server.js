require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/db")


connectToDb()
app.listen(3000,()=>{
    console.log("Server running in PORT :3000")
    

})