import { useState, useContext } from "react";
import { Shield } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";
import { NetworkContext } from "../../context/NetworkContext";

export default function PortScanner() {

  const [host, setHost] = useState("");
  const [ports, setPorts] = useState("22,80,443");
  const { analyze, loading } = useNetwork();
  const { result } = useContext(NetworkContext);

  async function handleScan() {
    if (!host.trim()) return;
    await analyze("portscan", `${host}|${ports}`);
  }

  return (
    <ToolCard
      title="🚪 Port Scanner"
      description="Scan open ports."
    >

      <div className="grid grid-cols-2 gap-4">

        <input
          value={host}
          onChange={(e)=>setHost(e.target.value)}
          placeholder="192.168.1.10"
          className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
        />

        <input
          value={ports}
          onChange={(e)=>setPorts(e.target.value)}
          placeholder="22,80,443"
          className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
        />

      </div>

      <button
        onClick={handleScan}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 py-3 flex items-center gap-2"
      >
        <Shield size={18} />
        {loading ? "Scanning..." : "Scan"}
      </button>

      {result && result.host === host && (
        <pre className="mt-6 rounded-xl bg-slate-800 p-4 text-green-400 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </ToolCard>
  );
}