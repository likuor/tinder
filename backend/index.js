const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
// const port = process.env.SERVER_URL || 8000;
const port = 8000;

const http = require("http");
const server = http.createServer(app);
app.use(
	cors({
		origin: [process.env.FRONT_URL, "http://localhost:3000"],
		credentials: true,
		optionsSuccessStatus: 200, 
	})
);
const { Server } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: process.env.FRONT_URL,
		credentials: true,
		methods: ["GET", "POST", "DELETE"],
	},
});
app.use(
	cookieSession({
		name: "session",
		secret: "key",
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 10000 * 60 * 60,
			secure: false,
		},
	})
);

io.on("connection", async (socket) => {
	socket.on("join_room", (roomId) => {
		socket.join(roomId);
		io.to(roomId).emit("joined_room", roomId);
	});
	socket.on("send_msg", (data) => {
		console.log("msg", data);
		io.to(data.roomId).emit("recived_msg", data.data);
	});
	socket.on("disconnect", () => {});
});
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const settingRoute = require("./routes/setting");
const interestsRoute = require("./routes/interests");
const likesRoute = require("./routes/likes");
const chatRoute = require("./routes/chat");
const imageRoute = require("./routes/image");
// const {
// 	S3Client,
// } = require("@aws-sdk/client-s3");

// const bucketName = process.env.BUCKET_NAME;
// const bucketRegion = process.env.BUCKET_REGION;
// const accessKey = process.env.ACCESS_KEY;
// const secretAccessKey = process.env.SECRET_ACCESS_KEY;
// const s3 = new S3Client({
// 	credentials: {
// 		accessKeyId: accessKey,
// 		secretAccessKey: secretAccessKey,
// 	},
// 	region: bucketRegion,
// });
mongoose
	.connect(process.env.APP_MONGO_URL)
	.then(() => {
		console.log("DB connecting");
	})
	.catch((err) => {
		console.log(err);
	});
// app.use(function (req, res, next) {
// 	res.setHeader("Access-Control-Allow-Origin", `${process.env.SERVER_URL}`);
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// 	);
// 	res.setHeader(
// 		"Access-Control-Allow-Headers",
// 		"X-Requested-With,content-type"
// 	);
// 	res.setHeader("Access-Control-Allow-Credentials", true);
// 	next();
// });
app.use("/", authRoute);
app.use("/", settingRoute);
app.use("/", interestsRoute);
app.use("/", likesRoute);
app.use("/", chatRoute);
app.use("/", imageRoute);
server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
