import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Cpu,
  HardDrive,
  Wifi,
  Activity,
  Terminal,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export default function DeviceDetail({ device, metrics, commands, loading, onSendCommand, commandLoading, onOpenEdit, onOpenDelete }) {
  const [commandName, setCommandName] = useState("");
  const [commandText, setCommandText] = useState("");
  const [commandMessage, setCommandMessage] = useState("");

  const deviceMetrics = useMemo(() => {
    return metrics.slice(0, 8);
  }, [metrics]);

  const chartData = useMemo(() => {
    return metrics
      .map((metric) => ({
        time: new Date(metric.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        cpu: metric.cpu,
        ram: metric.ram,
        disk: metric.disk,
        network: metric.networkRx + metric.networkTx,
      }))
      .slice(-20);
  }, [metrics]);

  const quickCommands = [
    { label: "ipconfig", command: "ipconfig" },
    { label: "hostname", command: "hostname" },
    { label: "systeminfo", command: "systeminfo" },
    { label: "whoami", command: "whoami" },
    { label: "netstat", command: "netstat -an" },
  ];

  const handleQuickCommand = (selectedCommand) => {
    setCommandName(selectedCommand);
    setCommandText(selectedCommand);
    setCommandMessage("Ready to send quick command.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!device) return;
    if (!commandText.trim()) {
      setCommandMessage("Enter a command before sending.");
      return;
    }

    try {
      await onSendCommand(device._id, {
        name: commandName || "Remote Task",
        command: commandText,
        args: [],
      });

      setCommandName("");
      setCommandText("");
      setCommandMessage("Command queued successfully.");
    } catch (err) {
      setCommandMessage(err.message || "Unable to queue command.");
    }
  };

  if (!device) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
        <p className="text-lg font-semibold text-white">Select a device to inspect details.</p>
        <p className="mt-3">Device health, recent metrics, services, and remote commands appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-slate-400">Device details</p>
            <h2 className="text-2xl font-semibold text-white">{device.displayName || device.hostname}</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`rounded-full px-4 py-2 text-sm font-semibold ${device.online ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>
              {device.online ? "Online" : "Offline"}
            </span>
            <span className="rounded-full bg-slate-900 px-4 py-2 text-sm text-slate-300">Health {device.healthScore ?? "—"}%</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenEdit}
                className="rounded-2xl bg-slate-900 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
              >
                Edit
              </button>
              <button
                onClick={onOpenDelete}
                className="rounded-2xl bg-red-900 px-3 py-2 text-sm text-red-200 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Cpu size={18} />
              <span>CPU</span>
            </div>
            <p className="mt-3 text-2xl text-white">{device.cpu?.usage ?? "—"}%</p>
            <p className="mt-1 text-sm text-slate-500">{device.cpu?.cores || "—"} cores • {device.cpu?.speed || "—"} GHz</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <HardDrive size={18} />
              <span>Disk</span>
            </div>
            <p className="mt-3 text-2xl text-white">{device.disk?.percentage ?? "—"}%</p>
            <p className="mt-1 text-sm text-slate-500">{device.disk?.used || "—"} / {device.disk?.total || "—"} GB</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Wifi size={18} />
              <span>Network</span>
            </div>
            <p className="mt-3 text-2xl text-white">{device.network?.latency ?? "—"} ms</p>
            <p className="mt-1 text-sm text-slate-500">{device.network?.gateway || "No gateway"}</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock3 size={18} />
              <span>Uptime</span>
            </div>
            <p className="mt-3 text-2xl text-white">{device.uptime || "—"}</p>
            <p className="mt-1 text-sm text-slate-500">Last seen {new Date(device.lastSeen).toLocaleString()}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-white">Metrics Timeline</h3>
              <p className="text-sm text-slate-400">Recent performance snapshots from the selected device.</p>
            </div>
            <Activity size={20} className="text-slate-400" />
          </div>

          <div className="mt-6 space-y-4">
            {deviceMetrics.length === 0 ? (
              <div className="rounded-2xl bg-slate-900 p-4 text-slate-400">No metrics available yet.</div>
            ) : (
              <div className="space-y-3">
                <div className="rounded-2xl bg-slate-900 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white">Live Health Chart</h4>
                      <p className="text-sm text-slate-400">Updated every 5 seconds from the selected device.</p>
                    </div>
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
                        <XAxis dataKey="time" stroke="#94A3B8" />
                        <YAxis stroke="#94A3B8" />
                        <Tooltip
                          contentStyle={{
                            background: "#0F172A",
                            border: "1px solid #334155",
                            borderRadius: 12,
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="cpu" stroke="#3B82F6" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="ram" stroke="#A855F7" strokeWidth={3} dot={false} />
                        <Line type="monotone" dataKey="disk" stroke="#10B981" strokeWidth={3} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {deviceMetrics.map((metric) => (
                  <div key={metric.timestamp} className="rounded-2xl bg-slate-900 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{new Date(metric.timestamp).toLocaleString()}</span>
                      <span>{metric.online ? "Online" : "Offline"}</span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm text-slate-200">
                      <div>
                        <div className="text-slate-400">CPU</div>
                        <div>{metric.cpu}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400">RAM</div>
                        <div>{metric.ram}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Disk</div>
                        <div>{metric.disk}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Network</div>
                        <div>{metric.networkRx} / {metric.networkTx} KB</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Services</h3>
                <p className="text-sm text-slate-400">Active service status for the selected device.</p>
              </div>
              <ShieldCheck size={20} className="text-slate-400" />
            </div>

            <div className="mt-6 space-y-3">
              {device.services?.length ? (
                device.services.slice(0, 6).map((service) => (
                  <div key={service.name} className="rounded-2xl bg-slate-900 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                      <div>
                        <div className="font-semibold text-white">{service.displayName || service.name}</div>
                        <div className="text-slate-500">{service.startupType || "Unknown"}</div>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${service.status === "Running" ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-700 text-slate-200"}`}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-900 p-4 text-slate-400">No service data available.</div>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold text-white">Remote Command</h3>
                <p className="text-sm text-slate-400">Send a command to the selected device.</p>
              </div>
              <Terminal size={20} className="text-slate-400" />
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm text-slate-400">Command name</label>
                <input
                  value={commandName}
                  onChange={(e) => setCommandName(e.target.value)}
                  placeholder="Restart service"
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              </div>              <div className="grid gap-3 sm:grid-cols-2">
                {quickCommands.map((item) => (
                  <button
                    key={item.command}
                    type="button"
                    onClick={() => handleQuickCommand(item.command)}
                    className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 hover:border-slate-700 hover:bg-slate-800"
                  >
                    <div className="font-semibold text-white">{item.label}</div>
                    <div className="text-slate-500">{item.command}</div>
                  </button>
                ))}
              </div>
              <div>
                <label className="text-sm text-slate-400">Command</label>
                <textarea
                  value={commandText}
                  onChange={(e) => setCommandText(e.target.value)}
                  placeholder="powershell Restart-Service -Name wuauserv"
                  rows={4}
                  className="mt-2 w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-purple-500"
                />
              </div>

              {commandMessage && (
                <div className="rounded-2xl bg-slate-900 p-3 text-sm text-slate-300">{commandMessage}</div>
              )}

              <button
                type="submit"
                disabled={commandLoading}
                className="w-full rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {commandLoading ? "Sending..." : "Send Command"}
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <h3 className="text-xl font-semibold text-white">Command History</h3>
            <p className="text-sm text-slate-400">Recent commands queued on this endpoint.</p>

            <div className="mt-6 space-y-3">
              {commands.commandHistory?.length ? (
                commands.commandHistory.slice(0, 6).map((item) => (
                  <div key={`${item.command}-${item.timestamp}`} className="rounded-2xl bg-slate-900 p-4">
                    <div className="flex items-center justify-between gap-3 text-sm text-slate-300">
                      <span>{item.name || item.command}</span>
                      <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">{item.status}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">{new Date(item.timestamp).toLocaleString()}</div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-900 p-4 text-slate-400">No commands have been run yet.</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
