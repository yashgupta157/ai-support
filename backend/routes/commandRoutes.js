import express from "express";
import {
  generate,
  saveCommand,
  getCommands,
  deleteCommand,
} from "../controllers/commandController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", generate);

router.post("/save", protect, saveCommand);

router.get("/", protect, getCommands);

router.delete("/:id", protect, deleteCommand);

export default router;