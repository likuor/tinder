const router = require("express").Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { updateInfo, updateImage } = require("../controllers/setting");
router.post("/setting",upload.single("image"), updateInfo);
module.exports = router;