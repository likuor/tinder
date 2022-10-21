const User = require("../models/Users");
const UserInterests = require("../models/Interests");
const MongoClient = require("mongodb").MongoClient;
const updateInfo = async (req, res) => {
	try {
		const user = await User.findById(req.body.user_id);
		console.log("user", user);
		req.body.interests.forEach(async (element) => {
			const newInterests = new UserInterests({
				user_id: req.body.user_id,
				hobby: element,
			});
			const updateInterests = await newInterests.save();
			console.log(updateInterests);
		});
		const newInfo = await user.updateOne({
			$set: {
				username: req.body.username,
				job: req.body.username,
				sexual_orientation: req.body.sexual_orientation,
				age: req.body.age,
				about: req.body.about,
				gender: req.body.gender,
			},
		});
		const updatedUser = await User.findById(req.body.user_id);
		MongoClient.connect(process.env.APP_MONGO_URL, async (err, db) => {
			if (err) throw err;
			const collection = db.db("tinder").collection("userinterests");
			const result = collection
				.find({ user_id: req.body.user_id })
				.toArray((err, docs) => {
					if (err) {
						console.log(err);
						res.status(500).json(err);
					} else {
						res.status(200).json({
							user_id: req.body.user_id,
							...updatedUser._doc,
							interests: docs,
						});
					}
				});
		});
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { updateInfo };
