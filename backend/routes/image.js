const router = require("express").Router();
const {
	getImageForProfile,
	getImageForHome,
	getImageForChat,
} = require("../controllers/image");

router.post("/profileimage", getImageForProfile);
router.post("/chatlistimage", getImageForHome);
router.post("/userimage", getImageForChat);
module.exports = router;
