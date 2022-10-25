const Like = require("../models/Likes");
const User = require("../models/Users");
const sendLike = async (req, res) => {
	try {
		const newLike = await new Like({
			from: req.body.from,
			to: req.body.to,
		});
		const like = await newLike.save();
		console.log(like);
		res.status(200).json(like);
	} catch (err) {
		res.status(500).json(err);
	}
};
const getLike = async (req, res) => {
	try {
		const likeList = await Like.find({ to: req.body.uesr_id });
		const likedUser = [];
		// const getEachUser = async() => {
		//   likeList.forEach(async (item) => {
		//     // if(likedUser.length === 2 ) return res.status(200).json(likedUser);
		//     const userSendLike = await User.findById(item.from)
		//     console.log("user", userSendLike);
		//     likedUser.push(userSendLike);
		//     console.log("list", likedUser);
		//   })
		// }
		for (const item of likeList) {
			const userSendLike = await User.findById(item.from);
			likedUser.push(userSendLike);
		}
		// await getEachUser();
		// const getEachUser = likeList.map(async(item) => {
		//   const userSendLike = await User.findById(item.from)
		//   likedUser.push(userSendLike);
		//   return userSendLike
		// })
		res.status(200).json(likedUser);
	} catch (err) {
		res.status(500).json(err);
	}
};
const getUsers = async (req, res) => {
	try {
		const userList = await User.find({ gender: req.body.sexual_orientation });
		res.status(200).json(userList);
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { sendLike, getLike, getUsers };
