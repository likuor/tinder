const router = require("express").Router();
const { createChat, getChatList } = require("../controllers/chat");
router.post("/newchat", createChat)
router.post("/getchatlist", getChatList);
module.exports = router;
