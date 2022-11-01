const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const settingRoute = require("./routes/setting");
const interestsRoute = require("./routes/interests");
const likesRoute = require("./routes/likes");
const helmet = require("helmet");
const cors = require("cors");
const cookieSession = require("cookie-session");
app.use(cors());
app.use(helmet());
mongoose
	.connect(process.env.APP_MONGO_URL)
	.then(() => {
		console.log("DB connecting");
	})
	.catch((err) => {
		console.log(err);
	});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cookieSession({
		name: "seetion",
		keys: ["key1"],
	})
);
app.get("/", (req, res) => {
	res.send("hello express");
});
app.use("/", authRoute);
app.use("/", settingRoute);
app.use("/", interestsRoute);
app.use("/", likesRoute);
app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
