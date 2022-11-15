const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
	{
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
			default: "NoName",
		},
		course: {
			type: String,
			default: "",
		},
		sexual_orientation: {
			type: Array,
			default: [],
		},
		age: {
			type: Number,
			default: null,
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
		interests: {
			type: Array,
			default:[]
		},
		image: {
			type: String,
			default:null
		}
	},
	{ timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);