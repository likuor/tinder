const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			max: 50,
		},
		password: {
			type: String,
			required: true,
			min: 8,
			max: 50,
		},
		username: {
			type: String,
			default: "",
		},
		job: {
			type: String,
			default: "",
		},
		sexual_orientation: {
			type: Number,
			default: 0,
		},
		age: {
			type: Number,
			default: 0,
		},
		about: {
			type: String,
			default: "",
			max: 150,
		},
		gender: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);