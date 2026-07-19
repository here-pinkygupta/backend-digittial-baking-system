const mongoose = require("mongoose")


const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        require:[true, "Transaction must be associated with a from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        require:[true, "Transaction must be associated with a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            values: ["PENDING","COMPLETED", "FAILED", "REVERSED"],
            message:"Status can be either PENDING,COMPLETED, FAILED or REVERSED"
        },
        default:"PENDING"
    },
    amount:{
    type:Number,
    required:[true,"Amount is required for creating a transaction"],
    min:[0, "Transaction cannot be negative"]
},
    idempotencyKey:{
        type: String,
        require:[true, "Idempotencykey is required for a transaction"],
        index:true,
        unique:true
    }
},{timestamps:true})


const transactionModel = new mongoose.model("transactions", transactionSchema)

module.exports=transactionModel