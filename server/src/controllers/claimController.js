const Claim = require("../models/Claim");

exports.createClaim = async (req, res) => {
  const claim = await Claim.create(req.body);
  res.status(201).json(claim);
};

exports.getClaims = async (req, res) => {
  const claims = await Claim.find().populate("policyId");
  res.json(claims);
};

exports.getClaimById = async (req, res) => {
  const claim = await Claim.findById(req.params.id);
  if (!claim) return res.status(404).json({ message: "Claim not found" });
  res.json(claim);
};

exports.updateClaimStatus = async (req, res) => {
  const { status } = req.body;
  const claim = await Claim.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true },
  );
  res.json(claim);
};
