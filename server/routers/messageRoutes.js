const express = require("express");

const { authenticate } = require("../middleware/authentication");
const { sendMessage, messages } = require("../controller/messageController");
const router = express.Router();

router.route("/:chatId").get(authenticate, messages);
router.route("/").post(authenticate, sendMessage);

module.exports = router;