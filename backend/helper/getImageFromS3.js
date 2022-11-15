const User = require("../models/Users");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
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
const getImageFromS3 = async (image) => {
	const getObjectParams = {
		Bucket: bucketName,
		Key: image,
	};
	const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 360000 });
  return url
};
module.exports = { getImageFromS3 };
