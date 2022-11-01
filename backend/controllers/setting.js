const User = require("../models/Users");
const updateInfo = async (req, res) => {
	try {
		const user = await User.findById(req.body.user_id);
		const newInfo = await user.updateOne({
			$set: {
				username: req.body.username,
				course: req.body.course,
				sexual_orientation: req.body.sexual_orientation,
				age: req.body.age,
				about: req.body.about,
				gender: req.body.gender,
				interests: req.body.interests,
			},
		});
			const updateUser = await User.findById(req.body.user_id);
			res.status(200).json({
				username: updateUser.username,
				course: updateUser.course,
				sexual_orientation: updateUser.sexual_orientation,
				age: updateUser.age,
				about: updateUser.about,
				gender: updateUser.gender,
				interests: updateUser.interests,
			});
	} catch (err) {
		res.status(500).json(err);
	}
};
module.exports = { updateInfo };
