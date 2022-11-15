const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server, Socket } = require("socket.io");
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "DELETE"],
	},
});

io.on("connection", async (socket) => {
	// io.use(async (socket, next) => {
	// 	try {
	// const user = "635c1acb1b5bf56ef76010ba";
	// socket.user = user;
	// const roomId = "assjkdfw3u4ifiale"
	// console.log("connected");
	const user = socket.id;
	socket.on("join_room", (roomId) => {
		socket.join(roomId);
		io.to(roomId).emit("joined_room", roomId, user);
		socket.on("send_msg", (data) => {
			io.to(roomId).emit("recived_msg", data);
		});
	});
	// 	} catch (e) {
	// 		next(new Error("unknown user"));
	// 	}
	// });
	// const roomId = 1
	// console.log(socket.rooms);

	socket.on("disconnect", () => {
		// console.log("disconnect");
	});
});
