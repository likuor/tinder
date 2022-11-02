const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8000;
require("dotenv").config();
const http = require("http");
app.use(cors());
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "DELETE"],
	},
});

// io.on("connection", async (socket) => {
// 	// io.use(async (socket, next) => {
// 	// 	try {
// 	// const user = "635c1acb1b5bf56ef76010ba";
// 	// socket.user = user;
// 	// const roomId = "assjkdfw3u4ifiale"
// 	// console.log("connected");
// 	const user = socket.id;
// 	socket.on("join_room", (roomId) => {
// 		socket.join(roomId);
// 		io.to(roomId).emit("joined_room", roomId, user);
// 		socket.on("send_msg", (data) => {
// 			console.log("msg", data);
// 			io.to(roomId).emit("recived_msg", data);
// 		});
// 	});
// 	// 	} catch (e) {
// 	// 		next(new Error("unknown user"));
// 	// 	}
// 	// });
// 	// const roomId = 1
// 	// console.log(socket.rooms);

// 	socket.on("disconnect", () => {
// 		// console.log("disconnect");
// 	});
// });
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const settingRoute = require("./routes/setting");
const interestsRoute = require("./routes/interests");
const likesRoute = require("./routes/likes");
const chatRoute = require("./routes/chat")
mongoose
	.connect(process.env.APP_MONGO_URL)
	.then(() => {
		console.log("DB connecting");
	})
	.catch((err) => {
		console.log(err);
	});
app.use(
	cookieSession({
		name: "seetion",
		keys: ["key1"],
	})
);
// app.get("/", (req, res) => {
// 	res.send("hello express");
// });
app.use("/", authRoute);
app.use("/", settingRoute);
app.use("/", interestsRoute);
app.use("/", likesRoute);
app.use("/", chatRoute);
server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
// server.listen(3000, () => {
// 	console.log(`[server] server is running on port 3000`);
// });
