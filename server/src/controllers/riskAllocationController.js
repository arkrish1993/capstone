const RiskAllocation = require("../models/RiskAllocation");
const Policy = require("../models/Policy");

exports.getAllocationByPolicy = async (req, res) => {
  try {
    const { policyId } = req.params;
    const policy = await Policy.findOne({
      policyNumber: policyId,
      status: "ACTIVE",
    });
    if (!policy) {
      return res.json({ message: "Policy not found" });
    }
    let allocations = await RiskAllocation.find({
      policyId: policy._id,
    })
      .populate("allocations.reinsurerId")
      .populate("allocations.treatyId");
    if (allocations.length) {
      res.json(allocations);
    } else {
      res.json({ message: "No risk allocation found." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
