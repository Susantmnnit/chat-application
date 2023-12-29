const express = require("express");
const {loginController,signupController, fetchUsers} = require("../controller/userController");
const {authenticate} = require("../middleware/authentication");

const Router = express.Router();

Router.post("/login",loginController);
Router.post("/signup",signupController);
Router.get("/fetchusers",authenticate,fetchUsers);

module.exports = Router;