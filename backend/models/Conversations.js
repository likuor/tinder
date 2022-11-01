const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
	{
		userIdFrom: {
			type: String,
			required: true,
		},
		userIdTo: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Conversation", ConversationSchema);
