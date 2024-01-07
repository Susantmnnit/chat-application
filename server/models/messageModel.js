const { default: mongoose } = require("mongoose");

const messageModel = mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }
});

const Message=mongoose.model("Message",messageModel);
module.exports=Message;