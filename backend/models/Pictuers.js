const mongoose = require("mongoose");
const PictuersSchema = new mongoose.Schema({
	pictuer_id: {
		type: mongoose.SchemaTypes.ObjectId,
	},
	user_id: {
		type: String,
		unique: true,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});
module.exports = mongoose.modelNames("Pictuers", PictuersSchema);
