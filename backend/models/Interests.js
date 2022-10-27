const mongoose = require("mongoose");
const UserInterestsSchema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true,
	},
	hobby: {
		type: String,
	},
});
module.exports = mongoose.model("UserInterests", UserInterestsSchema);
