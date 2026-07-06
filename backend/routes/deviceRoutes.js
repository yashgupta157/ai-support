import express from "express";

import {
  listDevices,
  getDevice,
  addDevice,
  updateDevice,
  deleteDevice,
  restoreDevice,
  getDeviceServices,
  recordDeviceMetrics,
  getDeviceMetrics,
  getDeviceCommands,
  executeDeviceCommand,
  getDeviceTickets,
} from "../controllers/deviceController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ======================================================
   DEVICE LIST
====================================================== */

router.get(
  "/",
  protect,
  listDevices
);

/* ======================================================
   DEVICE DETAILS
====================================================== */

router.get(
  "/:id",
  protect,
  getDevice
);

router.get(
  "/:id/services",
  protect,
  getDeviceServices
);

router.get(
  "/:id/metrics",
  protect,
  getDeviceMetrics
);

router.get(
  "/:id/tickets",
  protect,
  getDeviceTickets
);

router.get(
  "/:id/commands",
  protect,
  getDeviceCommands
);

/* ======================================================
   CREATE DEVICE
====================================================== */

router.post(
  "/",
  protect,
  authorize("admin", "technician"),
  addDevice
);

/* ======================================================
   METRICS
====================================================== */

router.post(
  "/:id/metrics",
  protect,
  authorize("admin", "technician"),
  recordDeviceMetrics
);

/* ======================================================
   COMMANDS
====================================================== */

router.post(
  "/:id/commands",
  protect,
  authorize("admin", "technician"),
  executeDeviceCommand
);

/* ======================================================
   RESTORE DEVICE
====================================================== */

router.post(
  "/:id/restore",
  protect,
  authorize("admin"),
  restoreDevice
);

/* ======================================================
   UPDATE DEVICE
====================================================== */

router.put(
  "/:id",
  protect,
  authorize("admin", "technician"),
  updateDevice
);

/* ======================================================
   DELETE DEVICE
====================================================== */

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDevice
);

export default router;