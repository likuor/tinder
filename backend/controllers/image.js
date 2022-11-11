const Images = require("../models/Images");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
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
const getImage = async (req, res) => {
	try {
		const image = await Images.findOne({
			user_id: req.body._id,
		});
		if(image === null)return res.status(200).json("nothing")
		const getObjectParams = {
			Bucket: bucketName,
			Key: image.path,
		};
		const command = new GetObjectCommand(getObjectParams);
		const url = await getSignedUrl(s3, command, { expiresIn: 360000 });
		res.status(200).json(url);
	} catch (err) {
		res.status(200).json(err);
	}
};
module.exports = { getImage };
