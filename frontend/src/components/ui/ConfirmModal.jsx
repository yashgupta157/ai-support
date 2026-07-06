export default function ConfirmModal({ open, onClose, onConfirm, title, children, confirmText = "Confirm", loading = false }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-[480px] rounded-2xl p-6 border border-slate-700 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <div className="text-slate-300 mb-4">{children}</div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition"
            disabled={loading}
          >
            {loading ? "Applying..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
