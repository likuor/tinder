const User = require("../models/Users");
const bcrypt = require("bcrypt");
const CreateUser = async (req, res) => {
	try {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return res.json("exsist");
		const hashPsw = await bcrypt
			.hash(req.body.password, 12)
			.then((hashedPassword) => {
				return hashedPassword;
			});
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPsw,
		});
		const user = await newUser.save();
		// console.log("new",newUser);
    res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
};

const LoginUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).send("We can not find the user");
		const isUserMatch = await bcrypt.compare(req.body.password, user.password)
		if (!isUserMatch) return res.status(400).json("password is wrong");
		return res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err)
	}
}
module.exports = { CreateUser, LoginUser };
