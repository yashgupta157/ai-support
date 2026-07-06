import { useState, useContext } from "react";
import { Clock } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";
import { NetworkContext } from "../../context/NetworkContext";

export default function LatencyTest() {
  const [host, setHost] = useState("");
  const { analyze, loading } = useNetwork();
  const { result } = useContext(NetworkContext);

  async function handleTest() {
    if (!host.trim()) return;
    await analyze("latency", host);
  }

  return (
    <ToolCard
      title="⚡ Latency Test"
      description="Measure round-trip latency to a host."
    >
      <div className="flex gap-4">
        <input
          value={host}
          onChange={(e) => setHost(e.target.value)}
          placeholder="google.com or 8.8.8.8"
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 outline-none"
        />

        <button
          onClick={handleTest}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 flex items-center gap-2"
        >
          <Clock size={18} />
          {loading ? "Testing..." : "Test"}
        </button>
      </div>

      {result && (
        <pre className="mt-6 rounded-xl bg-slate-800 p-4 text-green-400 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </ToolCard>
  );
}
