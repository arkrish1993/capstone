const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+passwordHash");
  const match = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.json({
    token,
    user: {
      userId: user._id,
      email: user.email,
      name: user.username,
      role: user.role,
    },
  });
};
