import { useState, useEffect } from "react";

export default function RenameConversationModal({
  open,
  onClose,
  onSave,
  currentTitle,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(currentTitle || "");
  }, [currentTitle]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-900 w-[420px] rounded-2xl p-6 border border-slate-700 shadow-2xl">

        <h2 className="text-2xl font-bold mb-5">
          ✏️ Rename Conversation
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Conversation title..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 outline-none focus:border-purple-500"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!title.trim()) return;
              onSave(title.trim());
            }}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}