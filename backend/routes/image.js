const router = require("express").Router();
const { getImage } = require("../controllers/image");

router.get("/image", getImage);
module.exports = router;
