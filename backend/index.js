const express = require("express");
const app = express();
const port = 8000;
require("dotenv").config();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")

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
app.get("/", (req, res) => {
	res.send("hello express");
});
app.use("/auth", authRoute)
app
  .listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
