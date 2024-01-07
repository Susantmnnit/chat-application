const express = require("express");
const { groupExit, fetchGroups, createGroupChat, fetchChats, accessChats, addSelfToGroup } = require("../controller/chatController");
const {authenticate} = require("../middleware/authentication");
const Router = express.Router();

Router.route("/").post(authenticate,accessChats);
Router.route("/").get(authenticate,fetchChats);
Router.route("/createGroup").post(authenticate,createGroupChat);
Router.route("/fetchGroups").get(authenticate,fetchGroups);
Router.route("/groupExit").post(authenticate,groupExit);
Router.route("/addSelfToGroup").put(authenticate,addSelfToGroup);

module.exports = Router;