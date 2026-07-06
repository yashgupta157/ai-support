import {
  Cpu,
  Wifi,
  Activity,
  AlertCircle,
} from "lucide-react";

export default function DeviceList({ devices, summary, loading, selectedDevice, onSelect }) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <h2 className="text-xl font-semibold">Fleet Summary</h2>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Activity size={18} />
              <span>Total Devices</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{loading ? "..." : summary.totalDevices || 0}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Wifi size={18} />
              <span>Online</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{loading ? "..." : summary.online || 0}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <Cpu size={18} />
              <span>Offline</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{loading ? "..." : summary.offline || 0}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-3 text-slate-400">
              <AlertCircle size={18} />
              <span>Critical Alerts</span>
            </div>
            <p className="mt-4 text-3xl font-semibold text-white">{loading ? "..." : summary.criticalAlerts || 0}</p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Devices</h2>
            <p className="text-slate-500 text-sm">Select a device to inspect details and send remote commands.</p>
          </div>
          <span className="text-sm text-slate-400">{devices.length} found</span>
        </div>

        <div className="mt-6 space-y-3">
          {loading && <div className="rounded-2xl bg-slate-900 p-4 text-slate-400">Loading devices...</div>}

          {!loading && devices.length === 0 && (
            <div className="rounded-2xl bg-slate-900 p-4 text-slate-400">No managed devices available.</div>
          )}

          {devices.map((device) => {
            const active = selectedDevice?._id === device._id;

            return (
              <button
                key={device._id}
                onClick={() => onSelect(device._id)}
                className={`w-full rounded-3xl border px-5 py-4 text-left transition ${
                  active
                    ? "border-purple-500 bg-slate-900"
                    : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-400">{device.ipAddress || device.hostname}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{device.displayName || device.hostname}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${device.online ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>
                    {device.online ? "Online" : "Offline"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
                  <div>
                    <div className="text-slate-300">OS</div>
                    <div>{device.os || "Unknown"}</div>
                  </div>
                  <div>
                    <div className="text-slate-300">Health</div>
                    <div>{device.healthScore ?? "—"}%</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
