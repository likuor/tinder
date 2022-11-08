const Like = require("../models/Likes");
const User = require("../models/Users");
const Chat = require("../models/Chat");
const Likes = require("../models/Likes");

const sendLike = async (req, res) => {
	try {
		const exsitLike = await Like.find({
			from: req.body.from,
			to: req.body.to,
		});
		// if(exsitLike.length > 0)return res.status(406).json("you alredy liked");
		const newLike = await new Like({
			from: req.body.from,
			to: req.body.to,
		});

		const like = await newLike.save();
		const checkLike = await Like.find({ from: req.body.to, to: req.body.from });
		if (checkLike.length === 0) {
			return res.status(200).json(like);
		} else {
			const userInfo = await User.findById(checkLike[0].from);
			const newChat = await new Chat({
				user1: req.body.from,
				user2: req.body.to,
			});
			console.log(newChat);
			const createdChat = await newChat.save();
			res.status(200).json({ userInfo, createdChat });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
const getLike = async (req, res) => {
	try {
		const likeList = await Like.find({ to: req.body.uesr_id });
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
		const createdChat = await Chat.find({ user2: req.body.user_id });
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
	// console.log(req.body.user_id);
	try {
		const currentUser = await User.findById(req.body.user_id);
		// console.log("user",currentUser);
		const List = await User.find();
		for (const element of currentUser.sexual_orientation) {
			if (element.id === 4) {
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
				(item) => item._id.toString() !== req.body.uesr_id
			);
			const delAlredyLiked = delCurrentUser.filter(async (item) => {
				const likedList = await Likes.find({ from: req.body.user_id });
				for (const element of likedList) {
					if (element.to !== item._id.toString()) {
						return item;
					}
				}
			});
			res.status(200).json(delAlredyLiked);
		} else {
			const likedList = await Likes.find({ from: req.body.user_id });
			const delAlredyLiked = whoLike.filter(async (item, index) => {
				console.log("item", item._id.toString());
				for (const i of likedList) {
					console.log('i',i.to);
					if (i.to !== item._id.toString()) {
						console.log("result", item._id.toString());
					}
				}
				return item
			});
			// console.log(delAlredyLiked);
			res.status(200).json(delAlredyLiked);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { sendLike, getLike, getUsers, checkLike };
