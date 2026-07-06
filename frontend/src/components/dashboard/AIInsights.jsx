import { Brain, Settings } from "lucide-react";
import { useState } from "react";
import useAIAdvisor from "../../hooks/useAIAdvisor";

export default function AIInsights({ system, loading }) {
  const { data, loading: aiLoading, error, analyzeNow } = useAIAdvisor(system);
  const [editing, setEditing] = useState(false);
  const [greenCutoff, setGreenCutoff] = useState(75);
  const [yellowCutoff, setYellowCutoff] = useState(50);

  if (loading || !system) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 animate-pulse h-[420px]" />
    );
  }

  const health = data?.healthScore ?? system?.security ?? 0;
  const summary = data?.summary || "No summary available.";
  const recommendations = data?.recommendations || [];
  const commands = data?.commands || [];

  function healthEmoji(value) {
    if (value >= greenCutoff) return "🟢";
    if (value >= yellowCutoff) return "🟡";
    return "🔴";
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-6">

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="text-cyan-400" size={28} />
          <div>
            <h2 className="text-xl font-bold text-white">AI System Advisor</h2>
            <p className="text-sm text-slate-400">Automated system analysis & recommendations</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={analyzeNow}
            disabled={aiLoading}
            className="rounded bg-indigo-600 px-3 py-1 text-white disabled:opacity-50"
          >
            {aiLoading ? "Analyzing..." : "Analyze Now"}
          </button>

          <button
            onClick={() => setEditing((v) => !v)}
            title="Edit thresholds"
            className="rounded bg-slate-800 px-2 py-1 text-white"
          >
            <Settings size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
          <h3 className="text-sm text-slate-400">Overall Health</h3>
          <div className="mt-2 flex items-center justify-between">
            <div className="text-2xl font-bold text-white">{health}/100</div>
            <div className="text-sm text-slate-400">{healthEmoji(health)}</div>
          </div>

          {editing && (
            <div className="mt-3 flex gap-3 items-center">
              <label className="text-sm text-slate-400">Green ≥</label>
              <input
                type="number"
                value={greenCutoff}
                onChange={(e) => setGreenCutoff(Number(e.target.value || 0))}
                className="w-20 rounded bg-slate-800 px-2 py-1"
              />
              <label className="text-sm text-slate-400">Yellow ≥</label>
              <input
                type="number"
                value={yellowCutoff}
                onChange={(e) => setYellowCutoff(Number(e.target.value || 0))}
                className="w-20 rounded bg-slate-800 px-2 py-1"
              />
              <button
                onClick={() => setEditing(false)}
                className="ml-2 rounded bg-indigo-600 px-3 py-1 text-white"
              >
                Save
              </button>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
          <h3 className="font-semibold text-white">Summary</h3>
          <p className="mt-2 text-sm text-slate-400">{summary}</p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
          <h3 className="font-semibold text-white">Recommendations</h3>
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-400">
            {recommendations.length === 0 ? (
              <li>No recommendations</li>
            ) : (
              recommendations.map((r, i) => <li key={i}>{r}</li>)
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-950 p-4">
          <h3 className="font-semibold text-white">Suggested PowerShell Commands</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {commands.length === 0 ? (
              <div className="text-sm text-slate-400">No commands suggested</div>
            ) : (
              commands.map((c, i) => (
                <div key={i} className="rounded bg-slate-800 px-3 py-1 text-sm text-white">
                  {c}
                </div>
              ))
            )}
          </div>
        </div>

        {error && (
          <div className="text-sm text-red-400">AI Advisor error: {JSON.stringify(error)}</div>
        )}

      </div>

    </div>
  );
}