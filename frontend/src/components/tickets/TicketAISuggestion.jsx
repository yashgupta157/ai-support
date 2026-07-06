import { useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../ui/ConfirmModal";

export default function TicketAISuggestion({
  ticket,
  categorizeTicket,
  applySuggestion,
  getTicket,
}) {
  const [aiResult, setAiResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [applying, setApplying] = useState(false);

  async function handleAnalyze() {
    try {
      setLoading(true);

      const res = await categorizeTicket(ticket._id);

      setAiResult(res?.classification || null);

      if (!res?.classification) {
        toast.error("AI couldn't classify this ticket.");
      }
    } catch (err) {
      console.error(err);
      toast.error("AI analysis failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    try {
      setApplying(true);

      await applySuggestion(ticket._id, aiResult);

      if (getTicket) {
        await getTicket(ticket._id);
      }

      toast.success("Suggestion Applied");

      setAiResult(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to apply suggestion");
    } finally {
      setApplying(false);
      setConfirmOpen(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <h2 className="text-xl font-semibold">
          🤖 AI Assistant
        </h2>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="rounded-lg bg-amber-600 px-4 py-2 hover:bg-amber-700 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "AI Reclassify"}
        </button>

      </div>

      {!aiResult && (
        <div className="mt-6 rounded-xl bg-slate-950 p-6 text-center text-slate-400">
          Click <b>AI Reclassify</b> to analyze this ticket.
        </div>
      )}

      {aiResult && (

        <div className="mt-6 rounded-xl border border-amber-500/30 bg-slate-950 p-6">

          <div className="flex justify-between items-center">

            <h3 className="font-semibold text-amber-400">
              AI Suggestion
            </h3>

            <span className="rounded-full bg-amber-600 px-3 py-1 text-xs">

              {Math.round((aiResult.confidence || 0) * 100)}%

            </span>

          </div>

          <div className="grid grid-cols-2 gap-6 mt-6">

            <div>

              <p className="text-slate-500">
                Category
              </p>

              <p className="font-semibold">
                {aiResult.category || "-"}
              </p>

            </div>

            <div>

              <p className="text-slate-500">
                Priority
              </p>

              <p className="font-semibold capitalize">
                {aiResult.priority || "-"}
              </p>

            </div>

          </div>

          <div className="mt-6">

            <p className="text-slate-500 mb-2">
              Tags
            </p>

            <div className="flex flex-wrap gap-2">

              {aiResult.tags?.length ? (

                aiResult.tags.map((tag) => (

                  <span
                    key={tag}
                    className="rounded-full bg-indigo-600 px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>

                ))

              ) : (

                <span className="text-slate-400">
                  No Tags
                </span>

              )}

            </div>

          </div>

          {aiResult.note && (

            <div className="mt-6 rounded-lg bg-slate-900 p-4 text-amber-300">

              {aiResult.note}

            </div>

          )}

          <div className="mt-6 flex gap-3">

            <button
              onClick={() => setConfirmOpen(true)}
              className="rounded-lg bg-emerald-600 px-5 py-2 hover:bg-emerald-700"
            >
              Apply Suggestion
            </button>

            <button
              onClick={() => setAiResult(null)}
              className="rounded-lg bg-slate-700 px-5 py-2 hover:bg-slate-600"
            >
              Dismiss
            </button>

          </div>

        </div>

      )}

      <ConfirmModal
        open={confirmOpen}
        loading={applying}
        title={`Apply AI suggestion to "${ticket.title}"`}
        confirmText="Apply"
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleApply}
      />

    </div>
  );
}