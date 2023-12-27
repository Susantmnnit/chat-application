const jwt = require("jsonwebtoken");

const generateToken = (id)=>{
    return jwt.sign({id},process.env.SECRETKEY,{
        expiresIn:"30d",
    });
};

module.exports = generateToken;