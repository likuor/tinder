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
const { Server } = require("socket.io");
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
const imageRoute = require("./routes/image")
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const crypto = require("crypto")
const sharp = require("sharp")
const path = require("path")
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteBucketCommand } = require("@aws-sdk/client-s3");
// const  { getSignedUrl } = require("@aws-sdk/s3-request-presigner"); 
const Images = require("./models/Images");
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
const bucketName = process.env.BUCKET_NAME
const bucketRegion =process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region:bucketRegion
})
mongoose
.connect(process.env.APP_MONGO_URL)
.then(() => {
	console.log("DB connecting");
})
.catch((err) => {
	console.log(err);
});

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running..");
	});
}
app.use("/", authRoute);

app.use("/", settingRoute);
app.use("/", interestsRoute);
app.use("/", likesRoute);
app.use("/", chatRoute);
app.use("/", imageRoute);
app.post("/deleteimage", async(req, res) => {
	const image = await Images.findOne({ usr_id: "6364005204c4d5b81220fe46" });
	const getObjectParams = {
		Bucket: bucketName,
		Key: image.path,
	};
	const command = new DeleteBucketCommand(getObjectParams);
	await s3.send(command)
	await Pictuers.deleteOne({path: image.path})	
	res.send("ok");
});
server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
