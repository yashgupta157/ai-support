import { useState, useContext } from "react";
import { Globe } from "lucide-react";
import ToolCard from "./ToolCard";
import useNetwork from "../../hooks/useNetwork";
import { NetworkContext } from "../../context/NetworkContext";

export default function PublicIP() {
  const { analyze, loading } = useNetwork();
  const { result } = useContext(NetworkContext);
  const [requested, setRequested] = useState(false);

  async function handleFetch() {
    setRequested(true);
    await analyze("publicip", "");
  }

  return (
    <ToolCard
      title="🌍 Public IP"
      description="Retrieve your current public IP address."
    >
      <button
        onClick={handleFetch}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-xl px-6 py-3 flex items-center gap-2"
      >
        <Globe size={18} />
        {loading ? "Fetching..." : "Get Public IP"}
      </button>

      {requested && result && (
        <pre className="mt-6 rounded-xl bg-slate-800 p-4 text-green-400 overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </ToolCard>
  );
}
