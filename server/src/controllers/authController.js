const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET);
};

// Register User
exports.register = async (req, res) => {
  //   try {
  //     const exists = await User.exists();
  //     let nextId = 0;
  //     if (!exists) {
  //       nextId = 1;
  //     } else {
  //       const lastUser = await User.find()
  //         .sort({ _id: -1 })
  //         .limit(1)
  //         .select("_id");
  //       nextId = lastUser ? lastUser[0]._id + 1 : 1;
  //     }
  //     const user = await User.create({
  //       _id: nextId,
  //       ...req.body,
  //     });
  //     res.status(201).json(user);
  //     // const user = await User.create(req.body);
  //     const token = generateToken(user._id);
  //     res.status(201).json({
  //       token,
  //       user,
  //     });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
};

//User login
exports.login = async (req, res) => {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email }).select("+password");
  //   if (!user || !(await user.comparePassword(password))) {
  //     return res.status(401).json({ message: "Invalid Credentials" });
  //   }
  //   const token = generateToken(user._id);
  //   res.json({
  //     token,
  //     user: {
  //       userId: user._id,
  //       email: user.email,
  //       name: user.firstName,
  //       role: user.role,
  //     },
  //   });
};
