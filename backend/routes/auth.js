const router = require("express").Router();
const { CreateUser, LoginUser } = require("../controllers/auth");
router.post("/signup", CreateUser)
router.post("/login", LoginUser)
module.exports = router;
