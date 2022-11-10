const User = require("../models/Users");
const Images = require("../models/Images");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
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
		const user = await User.findById(update._id);
		const ImageName = await randomImageName();
		const newImage = new Images({
			user_id: update.user_id,
			path: ImageName,
		});
		const image = await newImage.save();
		const params = {
			Bucket: bucketName,
			Key: ImageName,
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
				about: ImageName,
				gender: update.gender,
				interests: update.interests,
			},
		});
		const updateUser = await User.findById(update.user_id);
		res.status(200).json({
			username: updateUser.username,
			course: updateUser.course,
			sexual_orientation: updateUser.sexual_orientation,
			age: updateUser.age,
			about: updateUser.about,
			gender: updateUser.gender,
			interests: updateUser.interests,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
const updateImage = async (req, res) => {};
module.exports = { updateInfo, updateImage };
