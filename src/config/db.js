const mongoose = require("mongoose")

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI).
    then(()=>{
        console.log("server is connected to database")}).
    catch(
        (err)=>{console.log("error occured at db, ",err)
        process.exit(1)
    })
    
}

module.exports=connectToDb