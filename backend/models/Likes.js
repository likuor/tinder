const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
	{
		likes_id: {
			type: mongoose.SchemaTypes.ObjectId,
		},
		user_id_from: {
			type: String,
		},
		user_id_to: {
			type: String,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.modelNames("like", LikeSchema);
