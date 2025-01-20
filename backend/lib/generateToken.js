const jwt = require("jsonwebtoken");
const secret = "Dii678@";

const generateToken = (id,res) =>{
    const token = jwt.sign({ id },secret,{
        expiresIn:"30d",
    });

    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000,
        httpOnly:true,

    });
    return token;

};
module.exports = generateToken;

