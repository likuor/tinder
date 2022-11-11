const mongoose = require("mongoose");
const ImagesSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.model("Images", ImagesSchema);
