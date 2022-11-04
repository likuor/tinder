const router = require("express").Router();
const {
	sendLike,
	getLike,
	getUsers,
	checkLike,
} = require("../controllers/likes");

router.post("/sendlike", sendLike);
router.get("/getlike", getLike)
router.post("/user", getUsers)
router.post("/checklike", checkLike);

module.exports = router;
