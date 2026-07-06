import { useState } from "react";

const initialState = {
  displayName: "",
  hostname: "",
  ipAddress: "",
  macAddress: "",
  os: "",
  osVersion: "",
  group: "",
  managedBy: "",
};

export default function DeviceOnboardForm({ createDevice, loading }) {
  const [device, setDevice] = useState(initialState);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setDevice({
      ...device,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      await createDevice(device);
      setMessage("Device onboarded successfully.");
      setDevice(initialState);
    } catch (err) {
      setError(err.message || "Failed to onboard device.");
    }
  };

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-white">Onboard New Device</h2>
          <p className="text-sm text-slate-400">Register a managed endpoint and start tracking metrics immediately.</p>
        </div>
      </div>

      {message && (
        <div className="mb-4 rounded-2xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            Display Name
            <input
              name="displayName"
              value={device.displayName}
              onChange={handleChange}
              placeholder="Workstation-01"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            Hostname
            <input
              name="hostname"
              value={device.hostname}
              onChange={handleChange}
              placeholder="WIN-12345"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            IP Address
            <input
              name="ipAddress"
              value={device.ipAddress}
              onChange={handleChange}
              placeholder="192.168.1.105"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            MAC Address
            <input
              name="macAddress"
              value={device.macAddress}
              onChange={handleChange}
              placeholder="00:1A:2B:3C:4D:5E"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            OS
            <input
              name="os"
              value={device.os}
              onChange={handleChange}
              placeholder="Windows 11"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            OS Version
            <input
              name="osVersion"
              value={device.osVersion}
              onChange={handleChange}
              placeholder="23H2"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            Group
            <input
              name="group"
              value={device.group}
              onChange={handleChange}
              placeholder="Engineering"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            Managed By
            <input
              name="managedBy"
              value={device.managedBy}
              onChange={handleChange}
              placeholder="Admin Team"
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Onboarding..." : "Onboard Device"}
        </button>
      </form>
    </section>
  );
}
