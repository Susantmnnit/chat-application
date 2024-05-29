const jwt = require("jsonwebtoken");
const User = require("../models/useModel");
const asyncHandler = require("express-async-handler");

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            if (!token) {
                res.status(401);
                throw new Error("Authorization failed: Token not provided");
            }
            const decoded = jwt.verify(token, process.env.SECRETKEY);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Authorization failed: Invalid token");
        }
    }
});

module.exports = { authenticate };
