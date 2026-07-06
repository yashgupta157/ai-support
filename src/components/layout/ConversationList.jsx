import { Pencil, Trash2 } from "lucide-react";

export default function ConversationList({
  conversations,
  selectedConversation,
  setSelectedConversation,
  loadMessages,
  renameConversation,
  deleteConversation,
  search,
}) {
  const filteredConversations = conversations.filter((conversation) =>
    conversation.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredConversations.length === 0) {
    return (
      <p className="text-slate-500 text-sm px-3">
        No conversations found
      </p>
    );
  }

  return (
    <div className="space-y-2">

      {filteredConversations.map((conversation) => (

        <div
          key={conversation._id}
          className={`group rounded-xl transition ${
            selectedConversation?._id === conversation._id
              ? "bg-purple-600"
              : "hover:bg-slate-800"
          }`}
        >

          <div className="flex items-center">

            <button
              onClick={() => {
                setSelectedConversation(conversation);
                loadMessages(conversation._id);
              }}
              className="flex-1 text-left p-3 truncate"
            >
              💬 {conversation.title}
            </button>

            <button
              className="p-2 opacity-0 group-hover:opacity-100 transition hover:text-cyan-400"
              onClick={async () => {
                const title = prompt(
                  "Rename Conversation",
                  conversation.title
                );

                if (!title) return;

                await renameConversation(
                  conversation._id,
                  title.trim()
                );
              }}
            >
              <Pencil size={16} />
            </button>

            <button
              className="p-2 opacity-0 group-hover:opacity-100 transition hover:text-red-400"
              onClick={async () => {
                if (
                  !window.confirm(
                    "Delete this conversation?"
                  )
                )
                  return;

                await deleteConversation(
                  conversation._id
                );
              }}
            >
              <Trash2 size={16} />
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}