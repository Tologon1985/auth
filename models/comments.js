const mongoose = require("mongoose")


const commentsSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    news: {
        type:mongoose.Schema.Types.ObjectId, ref:"news"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId, ref: "users"
    }
}, {timestamps:true})


module.exports = mongoose.model("comments", commentsSchema)