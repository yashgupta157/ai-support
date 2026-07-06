import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { analyzeLog } from "../controllers/uploadController.js";
import upload from "../middleware/upload.js";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeSystem } from "../controllers/aiAdvisorController.js";

const router = express.Router();

// AI Chat
router.post("/chat", protect, chatWithAI);

// AI System Advisor
router.post("/ai/system-analysis", protect, analyzeSystem);


// Log Upload
router.post(
  "/upload",
  protect,
  upload.single("logFile"),
  analyzeLog
);

export default router;