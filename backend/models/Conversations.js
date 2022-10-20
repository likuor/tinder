const mongoose = require("mongoose");
const ConversationSchema = new mongoose.Schema(
	{
		conversation_id: {
			type: mongoose.SchemaTypes.ObjectId,
		},
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
module.exports = mongoose.modelNames("Conversation", ConversationSchema);
