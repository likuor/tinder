const Like = require("../models/Likes");
const User = require("../models/Users");
const Chat = require("../models/Chat");

const sendLike = async (req, res) => {
	try {
		const exsitLike = await Like.find({
			from: req.body.from,
			to: req.body.to,
		});
		if(exsitLike.length > 0)return res.status(406).json("you alredy liked");
		const newLike = await new Like({
			from: req.body.from,
			to: req.body.to,
		});

		const like = await newLike.save();
		const checkLike = await Like.find({ from: req.body.to });
		if (checkLike.length === 0) {
			return res.status(200).json(like);
		} else {
			const userInfo = await User.findById(checkLike[0].from);
			const newChat = await new Chat({
				user1: req.body.from,
				user2: req.body.to
			});
			console.log(newChat);
			const createdChat = await newChat.save()
			res.status(200).json({userInfo:{...userInfo._doc,user_id:userInfo._id.toString()},chat:{...createdChat._doc,room_id: createdChat.id.toString()},});
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
const getUsers = async (req, res) => {
	try {
		const List = await User.find();
		if (req.body.sexual_orientation.includes(4))return res.status(200).json(List)
			console.log("List", List);
		const whoLike = await List.filter((item) => {
			for (const element of req.body.sexual_orientation) {
				if (item.gender === element) {
					console.log("FOR item", item);
					return item;
				}
			}
		});
		if (req.body.sexual_orientation.length > 1) {
			const filterdLike = await whoLike.filter((item) => {
				for (const element of item.sexual_orientation) {
					if (element === req.body.gender) {
						return item;
					}
				}
			});
			console.log("filter", filterdLike);
			const delCurrentUser =filterdLike.filter((item)=>item._id.toString() !== req.body.uesr_id)
			res.status(200).json(delCurrentUser);
		} else {
			res.status(200).json(whoLike);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { sendLike, getLike, getUsers };
