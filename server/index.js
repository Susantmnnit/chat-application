const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRoute");
const cors = require("cors");

const app=express();
dotenv.config();
require('./database/db');
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("app is running on..");
});
app.use("/user",userRoutes);

const PORT=process.env.PORT || 8000;

app.listen(PORT,console.log("server is running..."));