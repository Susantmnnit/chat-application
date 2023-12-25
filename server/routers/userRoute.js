const express = require("express");
const signupController = require("../controller/userController");
const loginController = require("../controller/userController");

const Router = express.Router();

Router.post("/login",loginController);
Router.post("/signup",signupController);

module.exports = Router;