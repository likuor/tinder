const mongoose = require("mongoose");
const MessagesSchmea = new mongoose.Schema(
	{
		user_id_from: {
			type: String,
		},
		user_id_to: {
			type: String,
		},
		message: {
			type: String,
			max:300
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("Messages", MessagesSchmea);
