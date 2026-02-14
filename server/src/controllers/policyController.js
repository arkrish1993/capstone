const Policy = require("../models/Policy");
const { allocateTreaties } = require("../services/helperService");
const { getClientIp, createAuditLog } = require("../services/helperService");

exports.createPolicy = async (req, res) => {
  try {
    const lastPolicy = await Policy.findOne({})
      .sort({ policyNumber: -1 })
      .select("policyNumber");
    let nextPolicyNumber = "P001";
    if (lastPolicy && lastPolicy.policyNumber) {
      const lastNumber = parseInt(lastPolicy.policyNumber.replace("P", ""), 10);
      const incremented = lastNumber + 1;
      nextPolicyNumber = `P${String(incremented).padStart(3, "0")}`;
    }
    const policy = await Policy.create({
      ...req.body,
      policyNumber: nextPolicyNumber,
      createdBy: req.user._id,
    });
    createAuditLog({
      entityType: "POLICY",
      entityId: policy._id,
      action: "CREATE",
      newValue: policy,
      performedBy: req.user._id,
      ipAddress: await getClientIp(req),
    });
    res.status(201).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolicies = async (req, res) => {
  try {
    const policies = await Policy.find()
      .populate("approvedBy", "username")
      .populate("createdBy", "username");
    res.json(policies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) return res.status(404).json({ message: "Policy not found" });
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePolicy = async (req, res) => {
  try {
    const oldValue = await Policy.findById(req.params.id);
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    createAuditLog({
      entityType: "POLICY",
      entityId: policy._id,
      action: "UPDATE",
      oldValue,
      newValue: policy,
      performedBy: req.user._id,
      ipAddress: await getClientIp(req),
    });
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.approvePolicy = async (req, res) => {
  try {
    const { policyId } = req.params;
    const userId = req.user._id;
    const allocation = await allocateTreaties(policyId, userId);
    res.json(allocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
