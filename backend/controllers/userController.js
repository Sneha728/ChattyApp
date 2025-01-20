const express = require("express");
const User = require("../models/userModel");
const generateToken = require("../lib/generateToken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    const { fullName, email, password, pic } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
            pic: pic || "https://png.pngtree.com/png-vector/20231018/ourmid/pngtree-smile-face-emoji-png-image_10203761.png",
        });

        if (newUser) {
            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                pic: newUser.pic,
                token: generateToken(newUser._id, res),
            });
        }

        return res.status(500).json({ message: "Failed to create user" });
    } catch (error) {
        console.error("Error in signup:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const login = async(req,res)=>{
    const { email,password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ message: "Invalid credentials"});
        }
       const isPasswordCorrect = await bcrypt.compare(password,user.password);
       if(!isPasswordCorrect){
        return res.status(400).json({ message: "Invalid Credentials"});
       }
       generateToken(user._id,res);
       res.status(201).json({
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        pic : user.pic,
       });

    }catch(error){
        console.log("Error in login controller " , error.message);
        return res.status(400).json({ message : "Internal server error"});
        
    }
};
const logout = async(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        return res.status(201).json({ message:"Logged out successfully"});

    }catch(error){
        console.log("Error in logout",error.message);
        return res.status(400).json({message:"Internal Server error"});

    }
}

// const updateProfile = async(req,res)=>{
//     try{

//     }catch(error){
//         console.log("Error in udating profile " , error.message);
//         return res.status(400).json({ message:"Internal server error!!"});
//     }
// }


const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user);
        
    }catch(error){
        console.log("Error in checkAuth",error.message);
        return res.status(400).json({message:"Internal Server Error"});
    }

}


module.exports = { signup ,login , logout,checkAuth };
