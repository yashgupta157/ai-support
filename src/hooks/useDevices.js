import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function useDevices() {
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState([]);
  const [summary, setSummary] = useState({ totalDevices: 0, online: 0, offline: 0, criticalAlerts: 0 });
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [metrics, setMetrics] = useState([]);
  const [commands, setCommands] = useState({ pendingCommands: [], commandHistory: [] });
  const [error, setError] = useState("");
  const [commandLoading, setCommandLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  async function fetchDevices() {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/devices");
      setDevices(res.data.devices || []);
      setSummary(res.data.summary || {
        totalDevices: 0,
        online: 0,
        offline: 0,
        criticalAlerts: 0,
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load devices.");
    } finally {
      setLoading(false);
    }
  }

  const selectDevice = useCallback(async (deviceId) => {
    if (!deviceId) {
      setSelectedDevice(null);
      setMetrics([]);
      setCommands({ pendingCommands: [], commandHistory: [] });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [deviceRes, metricsRes, commandsRes] = await Promise.all([
        api.get(`/devices/${deviceId}`),
        api.get(`/devices/${deviceId}/metrics?limit=20`),
        api.get(`/devices/${deviceId}/commands`),
      ]);

      setSelectedDevice(deviceRes.data.device || null);
      setMetrics(metricsRes.data.metrics || []);
      setCommands({
        pendingCommands: commandsRes.data.pendingCommands || [],
        commandHistory: commandsRes.data.commandHistory || [],
      });
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || err.message || "Failed to load device details.");
    } finally {
      setLoading(false);
    }
  }, []);

  async function refreshSelectedDevice() {
    if (!selectedDevice?._id) return;
    await selectDevice(selectedDevice._id);
    await fetchDevices();
  }

  useEffect(() => {
    if (!selectedDevice?._id) return;

    const interval = setInterval(() => {
      selectDevice(selectedDevice._id);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedDevice?._id, selectDevice]);

  async function createDevice(payload) {
    setLoading(true);
    setError("");

    try {
      await api.post("/devices", payload);
      await fetchDevices();
    } catch (err) {
      console.error(err);
      throw new Error(err?.response?.data?.message || err.message || "Failed to onboard device.", {
        cause: err,
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateDevice(deviceId, payload) {
    setUpdateLoading(true);
    setError("");

    try {
      const res = await api.put(`/devices/${deviceId}`, payload);
      return res.data.device;
    } catch (err) {
      console.error(err);
      throw new Error(err?.response?.data?.message || err.message || "Failed to update device.", {
        cause: err,
      });
    } finally {
      setUpdateLoading(false);
    }
  }

  async function deleteDevice(deviceId) {
    setDeleteLoading(true);
    setError("");

    try {
      await api.delete(`/devices/${deviceId}`);
      await fetchDevices();
      setSelectedDevice(null);
    } catch (err) {
      console.error(err);
      throw new Error(err?.response?.data?.message || err.message || "Failed to delete device.", {
        cause: err,
      });
    } finally {
      setDeleteLoading(false);
    }
  }

  async function restoreDevice(deviceId) {
    setLoading(true);
    setError("");

    try {
      await api.post(`/devices/${deviceId}/restore`);
      await fetchDevices();
    } catch (err) {
      console.error(err);
      throw new Error(err?.response?.data?.message || err.message || "Failed to restore device.", {
        cause: err,
      });
    } finally {
      setLoading(false);
    }
  }

  async function sendCommand(deviceId, payload) {
    setCommandLoading(true);
    setError("");

    try {
      await api.post(`/devices/${deviceId}/commands`, payload);
      await refreshSelectedDevice();
    } catch (err) {
      console.error(err);
      throw new Error(err?.response?.data?.message || err.message || "Failed to send command.", {
        cause: err,
      });
    } finally {
      setCommandLoading(false);
    }
  }

  return {
    loading,
    devices,
    summary,
    selectedDevice,
    metrics,
    commands,
    error,
    commandLoading,
    updateLoading,
    deleteLoading,
    fetchDevices,
    selectDevice,
    sendCommand,
    createDevice,
    updateDevice,
    deleteDevice,
    restoreDevice,
    refreshSelectedDevice,
  };
}
