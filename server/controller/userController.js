const express = require("express");
const userModel = require("../models/useModel");
const asyncHandler = require("express-async-handler");

const loginController = ()=>{};

const signupController = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.send(400);
        throw Error("Please fill all details");
    }

    const userExits = await userModel.findOne({email});
    if(userExits){
        throw new Error("User already exists");
    }

    const userNameExits = await userModel.findOne({name});
    if(userNameExits){
        throw new Error("User already exists");
    }

    const user=userModel.create({name,email,password});

});

module.exports = signupController;