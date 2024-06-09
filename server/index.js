const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRoute");
const chatRoutes = require("./routers/chatRoutes");
const messageRoutes = require("./routers/messageRoutes");
const cors = require("cors");
const http = require("http");
const { notFound, errorHandler } = require("./middleware/errorhandler");
const { Server } = require("socket.io");
const { connection } = require("mongoose");

const app = express();
dotenv.config({ path: ".\\..\\.env" });
require("./database/db");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app is running on..");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
