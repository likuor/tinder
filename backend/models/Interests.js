const mongoose = require("mongoose");
const InterestsSchema = new mongoose.Schema({
	intrests_id: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	user_id: {
		type: String,
		required: true,
	},
	hobby: {
		type: String,
	},
});
module.exports = mongoose.modelNames("Interests", InterestsSchema);
