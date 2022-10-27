const router = require("express").Router();
const { updateInfo } = require("../controllers/setting");
router.post("/setting", updateInfo);
module.exports = router;