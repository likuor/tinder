const router = require("express").Router();
const {
	CreateUser,
	LoginUser,
	AllSet,
	GetUser,
} = require("../controllers/auth");
router.post("/signup", CreateUser)
router.post("/login", LoginUser)
router.post("/all", AllSet);
router.get("/getuserinfo", GetUser);
module.exports = router;
