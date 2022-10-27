const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
	{
		From: {
			type: String,
			required: true,
		},
		To: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
