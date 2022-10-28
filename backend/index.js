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
	}
});
io.on("connection", async(socket) => {
	console.log("connected");
	socket.on("join_room", (roomId) => {
		console.log("roomId",roomId);
		socket.join(roomId);
		io.emit("joined_room",roomId);
		socket.on("send_msg", (data) => {
			console.log(data);
			// io.emit("recived_msg",data)	
			io.to(roomId).emit("recived_msg", data);
		});
	});
	// const roomId = 1
	// console.log(socket.rooms);

	socket.on("disconnect", () => {
		console.log("disconnect");
	});
});
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const settingRoute = require("./routes/setting");
const interestsRoute = require("./routes/interests");
const likesRoute = require("./routes/likes");
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
server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
// server.listen(3000, () => {
// 	console.log(`[server] server is running on port 3000`);
// });
