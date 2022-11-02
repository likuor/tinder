const router = require("express").Router();
const {createChat} = require("../controllers/chat")
router.post("/newchat", createChat)
module.exports = router;
