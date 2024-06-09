const asyncHandler = require("express-async-handler");
const ChatModel = require("../models/chatModel");
const userModel = require("../models/useModel");
const Message = require("../models/messageModel");

const accessChats = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    // console.log("UserId not received");
    return res.sendStatus(400);
  }

  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastMessage");

  isChat = await userModel.populate(isChat, {
    path: "lastMessage.sender",
    select: -"name email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: req.user.name,
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await ChatModel.create(chatData);
      const chats = await ChatModel.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(chats);
    } catch (err) {
      res.status(400);
      throw new Error("Chat not created");
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const results = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });

    const populatedResults = await userModel.populate(results, {
      path: "lastMessage.sender",
      select: "name email",
    });

    res.status(200).send(populatedResults);
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong in fetching chat data" });
  }
});

const fetchGroups = asyncHandler(async (req, res) => {
  try {
    const groups = await ChatModel.find({ isGroupChat: true })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(groups);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong in fetching groups" });
  }
});

// const createGroupChat = asyncHandler(async(req,res)=>{
//     if(!req.body.users || !req.body.name){
//         return res.status(400).send({message: "Data is insufficient"});
//     }

//     console.log(req.body);
//     var users = JSON.parse(req.body.users);
//     console.log("chatContrller/createGroups: ", res);
//     users.push(req.user);

//     try{
//         const groupChat = await ChatModel.create({
//             chatName:req.body.name,
//             users:users,
//             isGroupChat:true,
//             groupAdmin:req.user
//         });

//         const groupChats = await ChatModel.findOne({ _id: groupChat._id})
//         .populate("users","-password")
//         .populate("groupAdmin","-password");

//         res.status(200).json(groupChats);
//     }catch(err){
//         res.status(400);
//         throw new Error("somthing went wrong in creating group");
//     }
// });
const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Data is insufficient" });
  }

  try {
    const users = Array.isArray(req.body.users)
      ? req.body.users
      : JSON.parse(req.body.users);

    users.push(req.user);

    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const groupChats = await ChatModel.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(groupChats);
  } catch (err) {
    // console.error("Error creating group:", err);
    res.status(400).json({ error: "Something went wrong in creating group" });
  }
});

const addSelfToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await ChatModel.findByIdAndUpdate(
    chatId,
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(400);
    throw new Error("Chat or user not found");
  } else {
    res.json(added);
  }
});

const exitGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await ChatModel.findByIdAndUpdate(chatId, {
      $pull: { users: userId },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      res.status(400).send({ error: "User's chat not found" });
    } else {
      res.status(200).json(removed);
    }
  } catch (err) {
    res
      .status(400)
      .send({ error: "Something went wrong in removing user from chat" });
  }
});

const clearChats = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const chatId = req.body.chatId;
  // console.log(userId, chatId);
  try {
    const messages = await Message.find({ sender: userId, chat: chatId });
    await Message.deleteMany({ _id: { $in: messages.map((msg) => msg._id) } });
    res
      .status(200)
      .json({ message: "User messages in the chat cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error clearing user messages in the chat", error });
  }
});

const fetchChatUser = asyncHandler(async (req, res) => {
  // console.log("something");
  try {
    const chat = await ChatModel.findById(req.params.chatId).populate(
      "users",
      "name email"
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    // console.log(res);
    res.json(chat.users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  accessChats,
  fetchChats,
  fetchGroups,
  createGroupChat,
  exitGroup,
  addSelfToGroup,
  clearChats,
  fetchChatUser,
};
