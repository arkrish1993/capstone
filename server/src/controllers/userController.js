const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { getClientIp, createAuditLog } = require("../services/helperService");

exports.createUser = async (req, res) => {
  try {
    const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({ ...req.body, passwordHash });
    createAuditLog({
      entityType: "USER",
      entityId: user._id,
      action: "CREATE",
      newValue: user,
      performedBy: req.user._id,
      ipAddress: await getClientIp(req),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const body = req.body;
  if (req.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    body = { ...body, passwordHash };
  }
  const oldValue = await User.findById(req.params.id);
  const user = await User.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });
  createAuditLog({
    entityType: "USER",
    entityId: user._id,
    action: "UPDATE",
    oldValue,
    newValue: user,
    performedBy: req.user._id,
    ipAddress: await getClientIp(req),
  });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  createAuditLog({
    entityType: "USER",
    entityId: req.params.id,
    action: "DELETE",
    performedBy: req.user._id,
    ipAddress: await getClientIp(req),
  });
  res.json({ message: "User deleted" });
};
