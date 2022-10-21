const router = require("express").Router();
const { Getinterests, sendInterests } = require("../controllers/interests");
router.get("/interests", Getinterests);
router.post("/postinterests", sendInterests)
module.exports = router;
