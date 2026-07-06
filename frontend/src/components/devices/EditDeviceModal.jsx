import { useEffect, useState } from "react";

export default function EditDeviceModal({ open, onClose, onSave, device, saving }) {
  const [form, setForm] = useState({
    displayName: "",
    hostname: "",
    ipAddress: "",
    macAddress: "",
    os: "",
    osVersion: "",
    group: "",
    managedBy: "",
  });

  useEffect(() => {
    if (device) {
      setForm({
        displayName: device.displayName || "",
        hostname: device.hostname || "",
        ipAddress: device.ipAddress || "",
        macAddress: device.macAddress || "",
        os: device.os || "",
        osVersion: device.osVersion || "",
        group: device.metadata?.group || device.group || "",
        managedBy: device.metadata?.managedBy || device.metadata?.managedBy || "",
      });
    }
  }, [device]);

  if (!open) return null;

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    onSave({
      displayName: form.displayName,
      hostname: form.hostname,
      ipAddress: form.ipAddress,
      macAddress: form.macAddress,
      os: form.os,
      osVersion: form.osVersion,
      group: form.group,
      metadata: {
        managedBy: form.managedBy,
        group: form.group,
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Edit Device</h2>
            <p className="text-sm text-slate-400">Update managed device metadata and save changes.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-900 px-3 py-2 text-slate-400 hover:bg-slate-800"
          >
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            Display Name
            <input
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            Hostname
            <input
              name="hostname"
              value={form.hostname}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            IP Address
            <input
              name="ipAddress"
              value={form.ipAddress}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            MAC Address
            <input
              name="macAddress"
              value={form.macAddress}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            OS
            <input
              name="os"
              value={form.os}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            OS Version
            <input
              name="osVersion"
              value={form.osVersion}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-400">
            Group
            <input
              name="group"
              value={form.group}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
          <label className="space-y-2 text-sm text-slate-400">
            Managed By
            <input
              name="managedBy"
              value={form.managedBy}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-2xl bg-slate-800 px-5 py-3 text-sm text-slate-200 hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
