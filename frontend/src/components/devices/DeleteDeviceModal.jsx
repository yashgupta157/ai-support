export default function DeleteDeviceModal({ open, onClose, onConfirm, loading, device }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-[420px] rounded-2xl p-6 border border-slate-700 shadow-2xl">

        <h2 className="text-2xl font-bold mb-3">Delete Device</h2>

        <p className="text-sm text-slate-400">Are you sure you want to permanently delete <strong className="text-white">{device?.displayName || device?.hostname}</strong>? This action cannot be undone.</p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>
    </div>
  );
}
