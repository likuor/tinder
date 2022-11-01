const router = require("express").Router();
const { CreateUser, LoginUser, AllSet } = require("../controllers/auth");
router.post("/signup", CreateUser)
router.post("/login", LoginUser)
router.post("/all", AllSet);
module.exports = router;
