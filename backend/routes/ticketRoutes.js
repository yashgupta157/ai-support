import express from "express";
import {
  listTickets,
  getTicket,
  createTicket,
  updateTicket,
  archiveTicket,
  addComment,
  changeStatus,
  categorizeTicket,
  assignTicket,
} from "../controllers/ticketController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ==========================
// Tickets
// ==========================

router.get("/", protect, listTickets);

router.get("/:id", protect, getTicket);

router.post("/", protect, createTicket);

router.put("/:id", protect, updateTicket);

router.post("/:id/archive", protect, archiveTicket);

router.post("/:id/comment", protect, addComment);

router.post("/:id/status", protect, changeStatus);

router.post("/:id/categorize", protect, categorizeTicket);

// ==========================
// Assign Ticket (Admin Only)
// ==========================

router.post("/:id/assign", protect, assignTicket);

export default router;