const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRoute");
const chatRoutes = require("./routers/chatRoutes");
const messageRoutes = require("./routers/messageRoutes");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
dotenv.config();
require('./database/db');
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("app is running on..");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const server = http.createServer(app); 
const io = new Server(server, { 
    cors: {
        origin: "*",
    },
    pingTimeout: 60000,
});

io.on("connection", (socket) => {
    socket.on("setup", (user) => {
        socket.join(user.data._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
    });

    socket.on("new message", (newMessage) => {
        var chat = newMessage.chat;
        if (!chat.users) {
            return console.log("user not defined");
        }
        chat.users.forEach((user) => {
            if (user._id === newMessage._id) return;

            io.in(user._id).emit("message received", newMessage);
        });
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});