const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
	{
		from: {
			type: String,
		},
		to: {
			type: String,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Like", LikeSchema);
