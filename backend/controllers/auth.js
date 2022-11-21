const User = require('../models/Users');
const bcrypt = require('bcrypt');
const { getImageFromS3 } = require('../helper/getImageFromS3');

const CreateUser = async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail)
      return res.status(200).json({
        errMessage: '',
      });
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
    const id = await user.id.toString();
    res.status(200).json({ ...user._doc });
  } catch (err) {
    res.status(500).json(err);
  }
};

const LoginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send('We can not find the user');
    const isUserMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isUserMatch) {
      return res.status(400).json('password is wrong');
    } else {
      req.session.id = user._id.toString();
      console.log("req", req.session.id);
      // res.cookie('id', req.session.id);
      return res.status(200).json({user:null});
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const cookieCheck = async (req, res) => {
  try {
    const loggeinSession = req.session.id;
      console.log("req", req.session.id);
    return res.status(200).json(loggeinSession);
  } catch (err) {
    res.status(500).json(err);
  }
};

const Logout = async(req,res) => {
  try {
    req.session.id = null
    res.status(200).json("logout")
  } catch (err) {
    res.status(500),json(err)
  }
}
const GetUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
	CreateUser,
	LoginUser,
	GetUser,
	cookieCheck,
	Logout,
};
