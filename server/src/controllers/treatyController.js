const Treaty = require("../models/Treaty");
const Reinsurer = require("../models/Reinsurer");
const { createAuditLog, getClientIp } = require("../services/helperService");

exports.createTreaty = async (req, res) => {
  try {
    const reinsurer = await Reinsurer.findOne({ code: req.body.reinsurerId });
    if (!reinsurer) {
      return res.status(404).json({ message: "Reinsurer not found." });
    }
    const treaty = await Treaty.create({
      ...req.body,
      reinsurerId: reinsurer._id,
      status: "ACTIVE",
    });
    await createAuditLog({
      entityType: "TREATY",
      entityId: treaty._id,
      action: "CREATE",
      newValue: treaty,
      performedBy: req.user._id,
      ipAddress: await getClientIp(req),
    });
    res.status(201).json(treaty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTreaties = async (req, res) => {
  try {
    const today = new Date();
    await Treaty.updateMany(
      {
        effectiveTo: { $lt: today },
        status: { $ne: "EXPIRED" },
      },
      {
        $set: { status: "EXPIRED" },
      },
    );
    const treaties = await Treaty.find().populate("reinsurerId");
    res.json(treaties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTreaty = async (req, res) => {
  try {
    const oldValue = await Treaty.findById(req.params.id);
    if (!oldValue) {
      return res.status(404).json({ message: "Treaty not found." });
    }
    let reinsurer;
    if (req.body.reinsurerId) {
      reinsurer = await Reinsurer.findOne({ code: req.body.reinsurerId });
    } else {
      reinsurer = await Reinsurer.findById(oldValue.reinsurerId);
    }
    if (!reinsurer) {
      return res.status(400).json({ message: "Reinsurer not found." });
    }
    const treaty = await Treaty.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        reinsurerId: reinsurer._id,
      },
      { new: true },
    );
    await createAuditLog({
      entityType: "TREATY",
      entityId: treaty._id,
      action: "UPDATE",
      oldValue,
      newValue: treaty,
      performedBy: req.user._id,
      ipAddress: await getClientIp(req),
    });
    res.json(treaty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
