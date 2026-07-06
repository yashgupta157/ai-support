import express from "express";

import {
  getNotifications,
  getUnreadNotifications,
  markAsRead,
  markAllRead,
  deleteNotification,
  clearNotifications,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getNotifications);

router.get("/unread", protect, getUnreadNotifications);

router.patch("/read-all", protect, markAllRead);

router.patch("/:id/read", protect, markAsRead);


// IMPORTANT: static route first
router.delete("/clear", protect, clearNotifications);

// dynamic route last
router.delete("/:id", protect, deleteNotification);


export default router;