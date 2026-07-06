import Device from "../models/Device.js";

export async function appendDeviceMetrics(deviceId, metricsPayload) {
  const device = await Device.findOne({ _id: deviceId, deleted: { $ne: true } });

  if (!device) {
    throw new Error("Device not found");
  }

  const metricsEntry = {
    timestamp: metricsPayload.timestamp ? new Date(metricsPayload.timestamp) : new Date(),
    cpu: metricsPayload.cpu || 0,
    ram: metricsPayload.ram || 0,
    disk: metricsPayload.disk || 0,
    networkRx: metricsPayload.networkRx || 0,
    networkTx: metricsPayload.networkTx || 0,
    temperature: metricsPayload.temperature || 0,
    battery: metricsPayload.battery || 0,
    online: typeof metricsPayload.online === "boolean" ? metricsPayload.online : device.online,
  };

  device.metricsHistory.push(metricsEntry);
  device.online = metricsEntry.online;
  device.lastSeen = new Date();

  if (typeof metricsPayload.healthScore === "number") {
    device.healthScore = metricsPayload.healthScore;
  }

  if (metricsPayload.cpu !== undefined) {
    device.cpu.usage = metricsPayload.cpu;
  }
  if (metricsPayload.ram !== undefined) {
    device.ram.percentage = metricsPayload.ram;
  }
  if (metricsPayload.disk !== undefined) {
    device.disk.percentage = metricsPayload.disk;
  }

  await device.save();
  return device;
}

export async function getMetricsHistory(deviceId, limit = 100) {
  const device = await Device.findOne({ _id: deviceId, deleted: { $ne: true } }).select("metricsHistory");

  if (!device) {
    throw new Error("Device not found");
  }

  const history = device.metricsHistory
    .slice(-limit)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return history;
}

export async function enqueueDeviceCommand(deviceId, commandPayload, userId) {
  const device = await Device.findById(deviceId);

  if (!device) {
    throw new Error("Device not found");
  }

  const commandEntry = {
    name: commandPayload.name || commandPayload.command || "Remote Task",
    command: commandPayload.command || "",
    args: Array.isArray(commandPayload.args) ? commandPayload.args : [],
    initiatedBy: userId || null,
    status: "Pending",
    result: "",
    timestamp: new Date(),
  };

  device.pendingCommands.push(commandEntry);
  device.commandHistory.push(commandEntry);

  await device.save();
  return device;
}
