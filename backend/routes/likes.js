const router = require("express").Router();
const { sendLike, getLike, getUsers } = require("../controllers/likes");

router.post("/sendlike", sendLike);
router.get("/getlike", getLike)
router.post("/user", getUsers)

module.exports = router;
