const Chat = require("../models/Chat");
const User = require("../models/Users")
const createChat = (req, res) => {
	try {
	} catch (err) {
		res.status(500).json(err);
	}
};
const getChatList = async (req, res) => {
	try {
		const chatList1 = await Chat.find({ user1: req.body.user_id });
    const chatList2 = await Chat.find({ user2: req.body.user_id });
    console.log("1", chatList1,"2",chatList2);
    const list = [...chatList1, ...chatList2];
		const userAndRoomInfo = [];
    console.log("result",userAndRoomInfo);
		if (list.length > 0) {
			for (const item of list) {
				if (item.user1 === req.body.user_id) {
					const userInfo = await User.findById(item.user2.toString());
					userAndRoomInfo.push({ userInfo, createdChat: item });
				} else {
					const userInfo = await User.findById(item.user1.toString());
					userAndRoomInfo.push({ userInfo, createdChat: item });
				}
      }
			return res.status(200).json(userAndRoomInfo);
		} else {
			return res.status(200).json([]);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { createChat, getChatList };
