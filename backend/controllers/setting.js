const User = require('../models/Users');
const updateInfo = async (req, res) => {
  try {
    const update = req.body;

    const user = await User.findById(update._id);
    await user.updateOne({
      $set: {
        username: update.username,
        course: update.course,
        sexual_orientation: update.sexual_orientation,
        age: update.age,
        about: update.about,
        gender: update.gender,
        interests: update.interests,
        image: update._id,
      },
    });
    const updateUser = await User.findById(update._id);
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { updateInfo };
