import { useState, useContext } from "react";
import { Shield } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";
import { NetworkContext } from "../../context/NetworkContext";

export default function SSLChecker() {

  const [host, setHost] = useState("");
  const { analyze, loading } = useNetwork();
  const { result } = useContext(NetworkContext);

  async function handleCheck() {
    if (!host.trim()) return;
    await analyze("ssl", host);
  }

  return (
    <ToolCard
      title="🔐 SSL Checker"
      description="Check certificate details for a host."
    >

      <div className="grid grid-cols-2 gap-4">

        <input
          value={host}
          onChange={(e)=>setHost(e.target.value)}
          placeholder="example.com"
          className="rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
        />

        <div />

      </div>

      <button
        onClick={handleCheck}
        disabled={loading}
        className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 py-3 flex items-center gap-2"
      >
        <Shield size={18}/>
        {loading ? "Checking..." : "Check"}
      </button>

      {result && (
        <pre className="mt-6 rounded-xl bg-slate-800 p-4 text-green-400 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

    </ToolCard>
  );
}