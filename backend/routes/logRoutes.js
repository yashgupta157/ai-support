import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadLog } from "../controllers/logController.js";
import { getLogs } from "../controllers/logHistoryController.js";
import { deleteLog } from "../controllers/logHistoryController.js";
const router = express.Router();
router.get("/", protect, getLogs);
router.post(
  "/upload",
  protect,
  upload.single("log"),
  uploadLog
);
router.delete("/:id", protect, deleteLog);
export default router;