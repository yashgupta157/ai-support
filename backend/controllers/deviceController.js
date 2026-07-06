import Device from "../models/Device.js";
import Ticket from "../models/Ticket.js";

import {
  appendDeviceMetrics,
  getMetricsHistory,
  enqueueDeviceCommand,
} from "../services/deviceService.js";

// ======================
// List Devices
// ======================

export async function listDevices(req, res) {
  try {
    const devices = await Device.find({
      deleted: { $ne: true },
    })
      .select(
        "hostname displayName ipAddress os online alerts healthScore lastSeen"
      )
      .sort({
        online: -1,
        lastSeen: -1,
      });

    const totalDevices = devices.length;
    const online = devices.filter((d) => d.online).length;
    const offline = totalDevices - online;

    const criticalAlerts = devices.reduce(
      (sum, device) =>
        sum +
        (device.alerts?.filter(
          (a) => a.severity === "Critical"
        ).length || 0),
      0
    );

    res.json({
      success: true,
      devices,
      summary: {
        totalDevices,
        online,
        offline,
        criticalAlerts,
      },
    });
  } catch (err) {
    console.error("List Devices Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Get Single Device
// ======================

export async function getDevice(req, res) {
  try {
    const { id } = req.params;

    const device = await Device.findOne({
      _id: id,
      deleted: { $ne: true },
    });

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    res.json({
      success: true,
      device,
    });
  } catch (err) {
    console.error("Get Device Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Add Device
// ======================

export async function addDevice(req, res) {
  try {
    const device = await Device.create(req.body);

    res.status(201).json({
      success: true,
      device,
    });
  } catch (err) {
    console.error("Add Device Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Update Device
// ======================

export async function updateDevice(req, res) {
  try {
    const { id } = req.params;

    const device = await Device.findOneAndUpdate(
      {
        _id: id,
        deleted: { $ne: true },
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    res.json({
      success: true,
      device,
    });
  } catch (err) {
    console.error("Update Device Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Delete Device
// ======================

export async function deleteDevice(req, res) {
  try {
    const { id } = req.params;

    const device = await Device.findById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    device.deleted = true;
    device.deletedAt = new Date();
    device.deletedBy = req.user?._id;

    await device.save();

    res.json({
      success: true,
    });
  } catch (err) {
    console.error("Delete Device Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Restore Device
// ======================

export async function restoreDevice(req, res) {
  try {
    const { id } = req.params;

    const device = await Device.findById(id);

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    device.deleted = false;
    device.deletedAt = null;
    device.deletedBy = null;

    await device.save();

    res.json({
      success: true,
      device,
    });
  } catch (err) {
    console.error("Restore Device Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Device Services
// ======================

export async function getDeviceServices(req, res) {
  try {
    const device = await Device.findById(req.params.id).select(
      "services"
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    res.json({
      success: true,
      services: device.services,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Record Metrics
// ======================

export async function recordDeviceMetrics(req, res) {
  try {
    const device = await appendDeviceMetrics(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      device,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Metrics History
// ======================

export async function getDeviceMetrics(req, res) {
  try {
    const history = await getMetricsHistory(
      req.params.id,
      Number(req.query.limit) || 100
    );

    res.json({
      success: true,
      metrics: history,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Commands
// ======================

export async function getDeviceCommands(req, res) {
  try {
    const device = await Device.findById(req.params.id).select(
      "pendingCommands commandHistory"
    );

    if (!device) {
      return res.status(404).json({
        success: false,
        message: "Device not found",
      });
    }

    res.json({
      success: true,
      pendingCommands: device.pendingCommands,
      commandHistory: device.commandHistory,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Execute Command
// ======================

export async function executeDeviceCommand(req, res) {
  try {
    const device = await enqueueDeviceCommand(
      req.params.id,
      req.body,
      req.user._id
    );

    res.json({
      success: true,
      device,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// ======================
// Device Tickets
// ======================

export async function getDeviceTickets(req, res) {
  try {
    const tickets = await Ticket.find({
      device: req.params.id,
      archived: false,
    })
      .populate("reporter", "name email")
      .populate("assignee", "name email")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      tickets,
    });
  } catch (err) {
    console.error("Get Device Tickets Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}