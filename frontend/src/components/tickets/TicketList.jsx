export default function TicketList({ tickets = [], loading, onSelect, selectedId }) {
  if (loading) {
    return <div className="rounded-xl p-4 bg-slate-900">Loading...</div>;
  }

  if (!tickets.length) {
    return <div className="rounded-xl p-4 bg-slate-900">No tickets</div>;
  }

  return (
    <div className="space-y-2">
      {tickets.map((t) => {
        const reviewed = Array.isArray(t.history) && t.history.some((event) => [
          "auto_categorized",
          "auto_categorized_low_confidence",
          "reclassified",
          "reclassified_low_confidence",
        ].includes(event.event));

        return (
          <div
            key={t._id}
            onClick={() => onSelect(t)}
            className={`p-3 rounded-xl cursor-pointer border ${selectedId === t._id ? 'border-purple-600 bg-slate-800' : 'border-slate-800 bg-slate-900'}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="font-semibold">{t.title}</div>
              {reviewed && (
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
                  AI reviewed
                </span>
              )}
            </div>
            <div className="text-sm text-slate-400">{t.priority} • {t.status}</div>
          </div>
        );
      })}
    </div>
  );
}
