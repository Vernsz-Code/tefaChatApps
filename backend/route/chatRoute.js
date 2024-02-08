const { sendMessage, getMessages } = require("../controller/chatController");
const { getUser } = require("../controller/userController");
const router = require("express").Router()

router.get("/getuser/:id", getUser);
router.post("/messages/send", sendMessage);
router.post("/messages/get", getMessages);

module.exports = router;