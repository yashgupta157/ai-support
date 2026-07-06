import { useState, useContext } from "react";
import { Globe } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";
import { NetworkContext } from "../../context/NetworkContext";

export default function WhoisLookup() {
  const [domain, setDomain] = useState("");
  const { analyze, loading } = useNetwork();
  const { result } = useContext(NetworkContext);

  async function handleLookup() {
    if (!domain.trim()) return;
    await analyze("whois", domain);
  }

  return(
    <ToolCard
      title="🌍 WHOIS Lookup"
      description="Retrieve WHOIS information."
    >

      <div className="flex gap-4">

        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3"
        />

        <button
          onClick={handleLookup}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 flex items-center gap-2"
        >
          <Globe size={18}/>
          {loading ? "Looking up..." : "Lookup"}
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