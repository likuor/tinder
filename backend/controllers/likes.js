const Like = require("../models/Likes");
const User = require("../models/Users");
const Chat = require("../models/Chat");
const Likes = require("../models/Likes");
const { delAlredyLiked } = require("../helper/delAlreadyLiked");
const { getImageFromS3 } = require("../helper/getImageFromS3");
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
const sendLike = async (req, res) => {
	try {
		const exsitLike = await Like.find({
			from: req.session.id,
			to: req.body.to,
		});
		// if(exsitLike.length > 0)return res.status(406).json("you alredy liked");
		const newLike = await new Like({
			from: req.session.id,
			to: req.body.to,
		});

		const like = await newLike.save();
		const checkLike = await Like.find({
			from: req.body.to,
			to: req.session.id,
		});
		if (checkLike.length === 0) {
			return res.status(200).json(like);
		} else {
			const userInfo = await User.findById(checkLike[0].from);
			const newChat = await new Chat({
				user1: req.session.id,
				user2: req.body.to,
			});
			const createdChat = await newChat.save();
			res.status(200).json({ userInfo, createdChat });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
const getLike = async (req, res) => {
	try {
		const likeList = await Like.find({ to: req.session.id });
		const likedUser = [];
		for (const item of likeList) {
			const userSendLike = await User.findById(item.from);
			likedUser.push(userSendLike);
		}
		res.status(200).json(likedUser);
	} catch (err) {
		res.status(500).json(err);
	}
};
const checkLike = async (req, res) => {
	try {
		const createdChat = await Chat.find({ user2: req.session.id });
		const list = [];
		if (createdChat.length > 0) {
			for (const item of createdChat) {
				const userInfo = await User.findById(item.user1.toString());
				list.push({ userInfo, createdChat: item });
			}
			return res.status(200).json(list);
		} else {
			return res.status(200).json([]);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
const getUsers = async (req, res) => {
	try {
		const currentUser = await User.findById(req.session.id);
		const List = await User.find();
		for (const element of currentUser.sexual_orientation) {
			if (element.id === 4) {
				console.log("every");
				return res.status(200).json(List);
			}
		}
		const whoLike = await List.filter((item) => {
			for (const element of currentUser.sexual_orientation) {
				if (item.gender === element.id) {
					return item;
				}
			}
		});
		if (currentUser.sexual_orientation.length > 1) {
			const filterdLike = await whoLike.filter((item) => {
				for (const element of item.sexual_orientation) {
					if (element.id === currentUser.gender) {
						return item;
					}
				}
			});
			const delCurrentUser = filterdLike.filter(
				(item) => item._id.toString() !== req.session.id
			);
			const likedList = await Likes.find({ from: req.session.id });
			const userList = await delAlredyLiked(likedList, delCurrentUser);
			res.status(200).json(userList);
		} else {
			const likedList = await Likes.find({ from: req.session.id });
			const userList = await delAlredyLiked(likedList, whoLike);
			res.status(200).json(userList);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { sendLike, getLike, getUsers, checkLike };
