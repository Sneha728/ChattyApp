const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName :{
        type:String,
        required:true,

    },
    email :{
        type:String,
        unique:true,
        required:true,

    },
    password : {
        type:String,
        required:true,
        minlength:6,
    },
    pic :{
        type:String,
        default : " https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-smile-face-emoji-png-image_10203761.png",

    }

},{timestamps:true});


const User = mongoose.model("User",userSchema);

module.exports = User;