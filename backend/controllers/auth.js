const User = require("../models/Users");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");
const router = require("../routes/auth");

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
			email: req.body.email,
			password: hashPsw,
		});
		const user = await newUser.save();
		res.cookie("user_id", user._id.toString());
		res.status(200).json({ ...user._doc, user_id: user._id });
	} catch (err) {
		res.status(500).json(err);
	}
};

const LoginUser = async (req, res) => {
	try {
		// need to talk redirect or not
		const cookie =await res.session.user_id
		if(cookie)return res.redirect("/home")
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).send("We can not find the user");
		const isUserMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isUserMatch) {
			return res.status(400).json("password is wrong");
		} else {
			req.session.user_id = user._id.toString();
			return res.status(200).json(user);
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

const AllSet = async (req, res) => {
	try {
		const checkEmail = await User.findOne({ email: req.body.email });
		if (checkEmail) return res.json("exsist");
		const hashPsw = await bcrypt
			.hash(req.body.password, 12)
			.then((hashedPassword) => {
				return hashedPassword;
			});
		const newUser = await new User({
			email: req.body.email,
			password: hashPsw,
			username: req.body.username,
			course: req.body.course,
			sexual_orientation: req.body.sexual_orientation,
			age: req.body.age,
			about: req.body.about,
			gender: req.body.gender,
			interests: req.body.interests,
		});
		const user = await newUser.save();
		res.status(200).json({ ...user._doc, user_id: user._id });
	} catch (err) {
		console.log(err);
	}
};
module.exports = { CreateUser, LoginUser, AllSet };
