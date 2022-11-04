const router = require("express").Router();
const {
	createChat,
	getChatList,
	saveChat,
	getChat,
} = require("../controllers/chat");
router.post("/newchat", createChat)
router.post("/getchatlist", getChatList);
router.post("/savechat", saveChat);
router.post("/getchat", getChat);
module.exports = router;
