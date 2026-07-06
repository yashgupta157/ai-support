import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  displayName: { type: String },
  status: { type: String, enum: ["Running", "Stopped", "Paused", "Unknown"], default: "Unknown" },
  startupType: { type: String, enum: ["Automatic", "Manual", "Disabled", "Unknown"], default: "Unknown" },
});

const processSchema = new mongoose.Schema({
  name: { type: String, required: true },
  pid: { type: Number, required: true },
  cpu: { type: Number, default: 0 },
  ram: { type: Number, default: 0 },
  user: { type: String, default: "" },
  path: { type: String, default: "" },
});

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nextRun: { type: Date },
  status: { type: String, default: "Unknown" },
});

const eventSchema = new mongoose.Schema({
  time: { type: Date, default: Date.now },
  level: { type: String, enum: ["Critical", "Error", "Warning", "Information"], default: "Information" },
  source: { type: String, default: "" },
  message: { type: String, default: "" },
});

const alertSchema = new mongoose.Schema({
  type: { type: String, default: "" },
  description: { type: String, default: "" },
  severity: { type: String, enum: ["Info", "Warning", "Critical"], default: "Info" },
  time: { type: Date, default: Date.now },
});

const metricsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  cpu: { type: Number, default: 0 },
  ram: { type: Number, default: 0 },
  disk: { type: Number, default: 0 },
  networkRx: { type: Number, default: 0 },
  networkTx: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  battery: { type: Number, default: 0 },
  online: { type: Boolean, default: true },
});

const commandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  command: { type: String, required: true },
  args: { type: [String], default: [] },
  initiatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  status: { type: String, enum: ["Pending", "Running", "Success", "Failed"], default: "Pending" },
  result: { type: String, default: "" },
  timestamp: { type: Date, default: Date.now },
});

const deviceSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    hostname: { type: String, required: true, trim: true },
    displayName: { type: String, trim: true },
    ip: { type: String, trim: true },
    ipAddress: { type: String, trim: true },
    mac: { type: String, trim: true },
    macAddress: { type: String, trim: true },
    os: { type: String, trim: true },
    osVersion: { type: String, trim: true },
    windowsVersion: { type: String, trim: true },
    biosVersion: { type: String, trim: true },
    platform: { type: String, trim: true },
    architecture: { type: String, trim: true },
    serialNumber: { type: String, trim: true },
    loggedUser: { type: String, trim: true },
    group: { type: String, trim: true },
    managedBy: { type: String, trim: true },
    status: {
      type: String,
      enum: ["online", "offline", "maintenance", "unknown"],
      default: "unknown",
    },
    online: { type: Boolean, default: false },
    lastSeen: { type: Date, default: null },
    uptime: { type: String, default: "" },
    metrics: {
      cpu: {
        usage: { type: Number, default: 0 },
        cores: { type: Number, default: 0 },
        speed: { type: Number, default: 0 },
        temperature: { type: Number, default: 0 },
      },
      ram: {
        total: { type: Number, default: 0 },
        used: { type: Number, default: 0 },
        free: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
      },
      disk: {
        total: { type: Number, default: 0 },
        used: { type: Number, default: 0 },
        free: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
      },
      network: {
        rx: { type: Number, default: 0 },
        tx: { type: Number, default: 0 },
        latency: { type: Number, default: 0 },
      },
    },
    cpu: {
      usage: { type: Number, default: 0 },
      cores: { type: Number, default: 0 },
      speed: { type: Number, default: 0 },
      temperature: { type: Number, default: 0 },
    },
    ram: {
      total: { type: Number, default: 0 },
      used: { type: Number, default: 0 },
      free: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
    disk: {
      total: { type: Number, default: 0 },
      used: { type: Number, default: 0 },
      free: { type: Number, default: 0 },
      percentage: { type: Number, default: 0 },
    },
    network: {
      rx: { type: Number, default: 0 },
      tx: { type: Number, default: 0 },
      latency: { type: Number, default: 0 },
      gateway: { type: String, default: "" },
      dns: { type: [String], default: [] },
    },
    services: { type: [serviceSchema], default: [] },
    processes: { type: [processSchema], default: [] },
    installedSoftware: { type: [String], default: [] },
    scheduledTasks: { type: [taskSchema], default: [] },
    events: { type: [eventSchema], default: [] },
    alerts: { type: [alertSchema], default: [] },
    deviceTimeline: { type: [String], default: [] },
    commandHistory: { type: [commandSchema], default: [] },
    pendingCommands: { type: [commandSchema], default: [] },
    healthScore: { type: Number, default: 100 },
    metricsHistory: { type: [metricsSchema], default: [] },
    metadata: {
      agentVersion: { type: String, default: "" },
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  {
    timestamps: true,
  }
);

const Device = mongoose.model("Device", deviceSchema);

export default Device;
