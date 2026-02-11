const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policyController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleGuard");

router.post(
  "/",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.createPolicy,
);
router.get(
  "/",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.getPolicies,
);
router.get(
  "/:id",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.getPolicyById,
);
router.put(
  "/:id",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.updatePolicy,
);
router.delete(
  "/:id",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.deletePolicy,
);
router.post(
  "/:policyId/approve",
  protect,
  authorize("ADMIN", "UNDERWRITER"),
  policyController.approvePolicy,
);

module.exports = router;
