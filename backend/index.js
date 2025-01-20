const express = require('express');
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/msgRoutes");
const { connectDB } = require("./lib/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { app,server }=require("./lib/socket");






app.use(express.json());
app.use(cookieParser());
app.use(cors(({
   origin :"https://chattyhello.onrender.com",
   credentials:true
})));


app.use("/api/users",userRoutes);
app.use("/api/messages",msgRoutes);
app.use("/api/auth", userRoutes);

app.get("/",(req,res)=>{
   return res.send("welcome to backend");
});

server.listen(9000,()=> console.log("server started at 9000"));
connectDB("mongodb+srv://snehaavala05:9AYQVatFvsvX5NPu@cluster0.2pdi5.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0");
