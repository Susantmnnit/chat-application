const userModel = require("../models/useModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../token/generateToken");

const loginController = asyncHandler (async(req,res)=>{
    console.log(req.body);
    const {name,password}=req.body;
    const user = await userModel.findOne({name});
    console.log(user.name);
    console.log(await user.matchPassword(password));
    if( user && (await user.matchPassword(password))){
        const response=({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id),
        });
        console.log(response);
        res.json(response);
    }
    else{
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

const signupController = asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        res.send(400);
        throw Error("Please fill all details");
    }

    const userExits = await userModel.findOne({email});
    if(userExits){
        res.status(406);
        throw new Error("User already exists");
    }

    const userNameExits = await userModel.findOne({name});
    if(userNameExits){
        res.status(405);
        throw new Error("User already exists");
    }

    const user=await userModel.create({name,email,password});
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id)
        });
    }
    else{
        res.status(400);
        throw new Error("somthing went wrong...");
    }
});

const fetchUsers = asyncHandler( async (req,res)=>{
    const keyword = req.query.search
        ? {
            $or:[
                {name:{$regex:req.query.search,$options: "i"}},
                {email:{$regex:req.query.search,$options:"i"}}
            ],
        }
        : {};

    const users = await userModel.findOne(keyword).find({
        _id: {$ne: req.user.id},
    });

    res.send(users);
})

module.exports = {signupController,loginController,fetchUsers};