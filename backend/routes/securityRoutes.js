import express from "express";
import { analyze } from "../controllers/securityController.js";
import { runSecurityScan } from "../controllers/securityController.js";
import { getSecurityStatusController } from "../controllers/securityStatusController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/scan", runSecurityScan);
router.post("/analyze", analyze);

// Live security status
router.get("/status", protect, getSecurityStatusController);

export default router;