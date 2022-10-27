const router = require("express").Router();
const { Getinterests} = require("../controllers/interests");
router.get("/interests", Getinterests);
module.exports = router;
