const express = require("express");
const app = express();
const cors = require("cors");
const cookieSession = require("cookie-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8000;
require("dotenv").config();
const http = require("http");
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
const server = http.createServer(app);
const { Server} = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "DELETE"],
	},
});
app.use(
	cookieSession({
		name: "id",
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
	const user = socket.id;
	socket.on("join_room", (roomId) => {
		socket.join(roomId);
		io.to(roomId).emit("joined_room", roomId, user);
	});
	socket.on("send_msg", (data) => {
		console.log("msg", data);
		io.to(data.roomId).emit("recived_msg", data.data);
	});
	socket.on("disconnect", () => {
	});
});
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const settingRoute = require("./routes/setting");
const interestsRoute = require("./routes/interests");
const likesRoute = require("./routes/likes");
const chatRoute = require("./routes/chat");;
mongoose
	.connect(process.env.APP_MONGO_URL)
	.then(() => {
		console.log("DB connecting");
	})
	.catch((err) => {
		console.log(err);
	});

app.use("/", authRoute);

app.use("/", settingRoute);
app.use("/", interestsRoute);
app.use("/", likesRoute);
app.use("/", chatRoute);
server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
