export default function UndoToast({ open, message, onUndo, onClose, duration = 6000 }) {
  if (!open) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50">
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl flex items-center gap-4">
        <div className="text-sm text-slate-200">{message}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={onUndo}
            className="rounded-xl bg-slate-800 px-3 py-2 text-sm text-white hover:bg-slate-700"
          >
            Undo
          </button>
          <button
            onClick={onClose}
            className="rounded-xl bg-transparent px-3 py-2 text-sm text-slate-400 hover:text-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
