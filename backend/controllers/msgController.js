const express = require("express");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const { getReceiverSocketId ,io } =require("../lib/socket");


const getUsersForsidebar = async(req,res)=>{
    try{
        const loggedInUserID = req.user._id;
        const filteredUsers = await User.find({_id : {$ne:loggedInUserID}}).select("-password");
        res.status(201).json(filteredUsers);

    }catch(error){
        console.log("error in msg getUsersForsidebar ",error.Message);
        return res.status(400).json({message:"Internal server error"});

    }

};

const getMessages = async(req,res)=>{
    try{

        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]

        });
       return res.status(201).json(messages);

    }catch(error){
        console.log("Error in getMessages",error.Message);
        return res.status(500).json({message:"Internal server error"});
    }

};

const sendMessages = async(req,res)=>{
    try{

        const { text } = req.body;                //req.body - Access the JSON data sent in the request body
        const { id: receiverId} = req.params;           //req.params is used for extracting values from the URL path itself.//id is renamed as receiver id for better understanding code
        const senderId = req.user._id ;      //here it is me

        const newMessages = new Message({
            senderId,
            receiverId,
            text

        });
        await newMessages.save();

        // real time functionality goes here => socket.io

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessages);
        } 

        res.status(201).json(newMessages);
            
    }catch{
        console.log("Error in sendMessages",error.message);
        return res.status(500).json({message : "Internal Server Error"});
    }

};



module.exports = { getUsersForsidebar , getMessages ,sendMessages};