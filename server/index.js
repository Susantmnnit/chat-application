const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routers/userRoute");
const chatRoutes = require("./routers/chatRoutes");
const messageRoutes = require("./routers/messageRoutes");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { sendMessage } = require("./controller/messageController");
const { authenticate, authentication } = require("./middleware/authentication");
const asyncHandler = require("express-async-handler");

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

const PORT = process.env.PORT || 8000;

const server = http.createServer(app); 

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
