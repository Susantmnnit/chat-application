const asyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const ChatModel = require("../models/chatModel");
const userModel = require("../models/useModel");

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

module.exports = {messages,sendMessage};