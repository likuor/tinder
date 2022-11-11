const router = require("express").Router();
const { getImage } = require("../controllers/image");

router.post("/image", getImage);
module.exports = router;
