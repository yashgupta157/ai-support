import { Plus } from "lucide-react";

export default function NewChatButton({ newConversation }) {
  return (
    <div className="px-4 mb-6">

      <button
        onClick={newConversation}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition rounded-xl py-3 font-semibold shadow-lg shadow-purple-600/20"
      >
        <Plus size={20} />

        New Chat

      </button>

    </div>
  );
}