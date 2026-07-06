import { useState } from "react";
import { Wifi } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";

export default function PingTool() {
  const [host, setHost] = useState("");

  const {
    analyze,
    loading,
    result,
  } = useNetwork();

  async function handlePing() {
    if (!host.trim()) return;

    await analyze("ping", host);
  }

  return (
    <ToolCard
      title="🌐 Ping Host"
      description="Check connectivity and latency."
    >
      <div className="flex gap-4">

        <input
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="google.com or 8.8.8.8"
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none"
        />

        <button
          onClick={handlePing}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 flex items-center gap-2"
        >
          <Wifi size={18} />

          {loading ? "Pinging..." : "Ping"}
        </button>

      </div>

      {/* Result */}

      {result && (
        <pre className="mt-6 rounded-xl bg-slate-800 p-4 text-green-400 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </ToolCard>
  );
}