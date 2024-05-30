const asyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const ChatModel = require("../models/chatModel");
const userModel = require("../models/useModel");
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config({path: '.\\..\\.env'});

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_API_SECRET_KEY,
  
});
// console.log("cloudinary-",process.env.PORT,process.env.CLOUDNARY_API_KEY,process.env.CLOUDNARY_API_SECRET_KEY);
const uploadFile = async (req,res) => {
    
  const file = req.file;
  try {
      if (!file) return null;

      const response = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto"
      });
      fs.unlinkSync(file.path); 
      // console.log("hello")
      res.send({status: 200, data: {url: response.url}});
  } catch (error) {
      console.log("error in upload file:" + error);
      fs.unlinkSync(file.path);
      res.send({status: 400, data: {message: "Error"+error}})
  }
}

const messages = asyncHandler(async (req, res) => {
    try {
      const message = await messageModel.find({ chat: req.params.chatId })
        .populate("sender", "name email")
        .populate("receiver", "name email")
        .populate("chat");
      res.json(message);
    } catch (error) {
      res.status(400).send({ error: "Messages not found" });
    }
});

const sendMessage = asyncHandler(async (req, res) => {
  console.log(req.body);
    const { content, chatId } = req.body;
  
    if (!content) {
      return res.sendStatus(400);
    }
  
    var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
      timestamp:Date.now(),
    };
  
    try {
      var message = await messageModel.create(newMessage);
  
      message = await messageModel.populate(message, [
        { path: "sender", select: "name" },
        { path: "chat" },
        { path: "receiver" },
      ]);
  
      message = await userModel.populate(message, {
        path: "chat.users",
        select: "name email",
      });
  
      await ChatModel.findByIdAndUpdate(chatId, { lastMessage: message });
      res.json(message);
    } catch (error) {
      res.status(400).send({ error: "Something went wrong or network error" });
    }
});

module.exports = {uploadFile,messages,sendMessage};