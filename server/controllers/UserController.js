const User = require('../models/User');
const { RegisterValidation, LoginValidation } = require('../validation/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserRegister = async (req, res) => {
  const { error } = RegisterValidation(req.body.Sendingdata);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Search if user already exists
    const existUser = await User.findOne({ Name: req.body.Sendingdata.Name });
    if (existUser) return res.status(400).send("User already exists");

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Sendingdata.Password, salt);

    // Create a new user and save to DB
    const user = new User({
      Name: req.body.Sendingdata.Name,
      Password: hashedPassword,
      Unit: req.body.Sendingdata.Unit,
      isAdmin: false
    });

    const savedUser = await user.save();

    // Create and assign a token
    const accessToken = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);

    res.status(200).send({
      Name: savedUser.Name,
      Unit: savedUser.Unit,
      isAdmin: savedUser.isAdmin,
      id: savedUser._id,
      accessToken: accessToken
    });

  } catch (err) {
    res.status(400).send(err.message);
  }
};

const UserLogin = async (req, res) => {
  // Validate request body
  const {Name,Password} = req.body.sendingData

  const { error } = LoginValidation(req.body.sendingData);
  if (error) 
    return res.status(400).send(error.details[0].message);

  try {
    // Check if user exists
    if( Name == ""  || Password == "") {
      return res.status(400).send("Please fill in all fields")
    }
    const existUser = await User.findOne({ Name: Name });
    if (!existUser) 
      return res.status(400).send("User doesn't exist");

    // Check if password is correct
    const validPass = await bcrypt.compare(Password ,existUser.Password);
    if (!validPass) return res.status(400).send("Invalid password");

    // Create and assign a token
    const accessToken = jwt.sign({ _id: existUser._id }, process.env.TOKEN_SECRET);

    res.status(200).send({
      Name: existUser.Name,
      isAdmin: existUser.isAdmin,
      id: existUser._id,
      accessToken: accessToken
    });

  } catch (err) {
    res.status(500).send("Failed to generate token");
  }
};

module.exports = {
  UserRegister,
  UserLogin
};
