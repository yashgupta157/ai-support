import express from "express";
import {
  createConversation,
  getConversations,
  renameConversation,
  deleteConversation,
  getConversationMessages,
} from "../controllers/conversationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createConversation);

router.get("/", protect, getConversations);
router.get("/:id/messages", protect, getConversationMessages);

router.put("/:id", protect, renameConversation);

router.delete("/:id", protect, deleteConversation);

export default router;