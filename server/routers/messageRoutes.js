const express = require("express");

const { authenticate } = require("../middleware/authentication");
const { sendMessage, messages, uploadFile } = require("../controller/messageController");
const { upload } = require("../middleware/multer");
const router = express.Router();

router.post('/fileUpload',upload.single('file'), uploadFile);
router.route("/:chatId").get(authenticate, messages);
router.route("/").post(authenticate, sendMessage);

module.exports = router;