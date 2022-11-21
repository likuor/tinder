const Images = require("../models/Images");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { getImageFromS3 } = require("../helper/getImageFromS3");
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
const getImageForProfile = async (req, res) => {
	try {
		const image = await Images.findOne({
			user_id: req.session.id,
		});
		if (image === null) return res.status(200).json("nothing");
		const url = await getImageFromS3(image.path);
		res.status(200).json(url);
	} catch (err) {
		res.status(200).json(err);
	}
};
const getImageForHome = async (req, res) => {
	try {
		const urlArray = [];
		for (const user of req.body.user_id) {
			const image = await Images.findOne({
				user_id: user.userInfo._id,
			});
			const url = await getImageFromS3(image.path);
			await urlArray.push(url);
		}
		res.status(200).json(urlArray);
	} catch (err) {
		res.status(200).json(err);
	}
};
const getImageForChat = async (req, res) => {
	try {
		const image = await Images.findOne({
			user_id: req.body.user_id,
		});
		const url = await getImageFromS3(image.path);
		res.status(200).json(url);
	} catch (err) {
		res.status(200).json(err);
	}
};
module.exports = { getImageForProfile, getImageForHome, getImageForChat};
