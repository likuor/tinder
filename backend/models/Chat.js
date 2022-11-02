const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema(
	{
		user1: {
			type: String,
			required: true,
		},
		user2: {
			type: String,
			required: true,
		},
		text: {
			type: Array,
			default:[]
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Chat", ChatSchema);
