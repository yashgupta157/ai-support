import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  changeRole,
  changeStatus,
  getTechnicians,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ===============================
// Logged-in Users
// ===============================

// Get Admins & Technicians

// ===============================
// Admin Only
// ===============================

// Get all users
router.get(
  "/",
  protect,
  authorize("admin"),
  getUsers
);
router.get(
  "/technicians",
  protect,
  getTechnicians
);

// Get single user
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getUser
);

// Create user
router.post(
  "/",
  protect,
  authorize("admin"),
  createUser
);

// Update user
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateUser
);

// Change role
router.patch(
  "/:id/role",
  protect,
  authorize("admin"),
  changeRole
);

// Change status
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  changeStatus
);

// Delete user
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUser
);

export default router;