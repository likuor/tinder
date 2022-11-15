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
		const checkImage = await Images.findOne({ user_id: update._id });
		const user = await User.findById(update._id);
		if (checkImage === null && req.file !== undefined) {
			const params = {
				Bucket: bucketName,
				Key: update._id,
				Body: req.file.buffer,
				ContentType: req.file.mimetype,
			};
			const command = new PutObjectCommand(params);
			await s3.send(command);
			const newImage = new Images({
				user_id: update._id,
				path: update._id,
			});
			const image = await newImage.save();
		}
		if (checkImage !== null && req.file !== undefined) {
			const params = {
				Bucket: bucketName,
				Key: update._id,
				Body: req.file.buffer,
				ContentType: req.file.mimetype,
			};
			const command = new PutObjectCommand(params);
			await s3.send(command);
		}
		await user.updateOne({
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
		const updateUser = await User.findById(update._id);
		res.status(200).json(updateUser);
	} catch (err) {
		res.status(500).json(err);
	}
};
const updateImage = async (req, res) => {};
module.exports = { updateInfo, updateImage };
