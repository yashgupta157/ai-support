import { useState } from "react";

export default function TicketForm({
  createTicket,
  createLoading,
  devices = [],
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [deviceId, setDeviceId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    const ticket = await createTicket({
      title,
      description,
      priority,
      device: deviceId || undefined,
    });

    if (ticket) {
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDeviceId("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-800 bg-slate-900 p-5"
    >
      <h2 className="mb-4 text-lg font-semibold text-white">
        Create New Ticket
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-slate-400">
            Title
          </label>

          <input
            type="text"
            placeholder="Enter issue title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-400">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Describe the issue..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-400">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-400">
            Linked Device
          </label>

          <select
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none"
          >
            <option value="">None</option>

            {devices.map((device) => (
              <option
                key={device._id}
                value={device._id}
              >
                {device.displayName || device.hostname}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={createLoading}
          className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {createLoading ? "Creating Ticket..." : "Create Ticket"}
        </button>
      </div>
    </form>
  );
}