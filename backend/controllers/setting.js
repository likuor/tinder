const User = require("../models/Users");
const Images = require("../models/Images");
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
	DeleteBucketCommand,
} = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const randomImageName = (bytes = 32) =>
	crypto.randomBytes(bytes).toString("hex");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const s3 = new S3Client({
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretAccessKey,
	},
	region: bucketRegion,
});
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const updateInfo = async (req, res) => {
	try {
		const update = await JSON.parse(req.body.userInfo);
		const checkImage = await Images.findOne({ user_id: update._id });
		console.log(checkImage);
		if (checkImage === null) {
			const ImageName = await randomImageName();
			const newImage = new Images({
				user_id: update._id,
				path: update._id,
			});
			const image = await newImage.save();
		}

		const user = await User.findById(update._id);
		const params = {
			Bucket: bucketName,
			Key: update._id,
			Body: req.file.buffer,
			ContentType: req.file.mimetype,
		};
		const command = new PutObjectCommand(params);
		await s3.send(command);
		const newInfo = await user.updateOne({
			$set: {
				username: update.username,
				course: update.course,
				sexual_orientation: update.sexual_orientation,
				age: update.age,
				about: update.about,
				gender: update.gender,
				interests: update.interests,
				image: update._id,
			},
		});
		console.log(newInfo);
		const updateUser = await User.findById(update._id);
		// console.log("update", updateUser);
		res.status(200).json(updateUser);
	} catch (err) {
		res.status(500).json(err);
	}
};
const updateImage = async (req, res) => {};
module.exports = { updateInfo, updateImage };
