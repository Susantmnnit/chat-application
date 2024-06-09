const express = require("express");
const {
  exitGroup,
  fetchGroups,
  createGroupChat,
  fetchChats,
  accessChats,
  addSelfToGroup,
  clearChats,
  fetchChatUser,
} = require("../controller/chatController");
const { authenticate } = require("../middleware/authentication");
const Router = express.Router();

Router.route("/").post(authenticate, accessChats);
Router.route("/").get(authenticate, fetchChats);
Router.route("/createGroup").post(authenticate, createGroupChat);
Router.route("/fetchGroups").get(authenticate, fetchGroups);
Router.route("/exitGroup").put(authenticate, exitGroup);
Router.route("/addSelfToGroup").put(authenticate, addSelfToGroup);
Router.route("/clearChats").delete(authenticate, clearChats);
Router.route("/users/:chatId").get(fetchChatUser);

module.exports = Router;
