export default function DeleteConversationModal({
  open,
  onClose,
  onDelete,
  title,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-[420px] rounded-2xl p-6 border border-slate-700 shadow-2xl">

        <h2 className="text-2xl font-bold text-red-400 mb-4">
          🗑 Delete Conversation
        </h2>

        <p className="text-slate-300">
          Are you sure you want to delete
        </p>

        <p className="font-semibold text-white mt-2 break-words">
          "{title}"
        </p>

        <p className="text-slate-500 mt-4">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}