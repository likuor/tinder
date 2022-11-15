const router = require("express").Router();
const { getChatList, saveChat, getChat } = require("../controllers/chat");
router.get("/getchatlist", getChatList);
router.post("/savechat", saveChat);
router.post("/getchat", getChat);
module.exports = router;
