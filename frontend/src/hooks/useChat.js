import { useState } from "react";
import api from "../services/api";
import { useConversation } from "../context/ConversationContext";

export default function useChat() {
  const [loading, setLoading] = useState(false);
  const {
    selectedConversation,
    messages,
    setMessages,
  } = useConversation();

  async function sendMessage(text) {
    if (!selectedConversation) {
      alert("Please create a conversation first.");
      return;
    }

    setLoading(true);

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: text,
      },
    ]);

    try {
      const res = await api.post("/chat", {
        message: text,
        conversationId: selectedConversation._id,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
async function regenerateMessage() {
  if (!selectedConversation) return;

  const lastUser = [...messages]
    .reverse()
    .find((m) => m.role === "user");

  if (!lastUser) return;

  setLoading(true);

  try {
    // Remove last assistant reply
    setMessages((prev) => {
      const arr = [...prev];
      if (arr[arr.length - 1]?.role === "assistant") {
        arr.pop();
      }
      return arr;
    });
const res = await api.post("/chat", {
  message: text,
  conversationId: selectedConversation._id,
});

// console.log("Chat API Response:", res.data);

setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content:
      typeof res.data.reply === "string"
        ? res.data.reply
        : JSON.stringify(res.data.reply, null, 2),
  },
]);

// console.log("Regenerate Response:", res.data);

setMessages((prev) => [
  ...prev,
  {
    role: "assistant",
    content:
      typeof res.data.reply === "string"
        ? res.data.reply
        : JSON.stringify(res.data.reply, null, 2),
  },
]);
    setMessages((prev) => [
      
      ...prev,
      {
        role: "assistant",
        content: res.data.reply,
      },
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}
 return {
  messages,
  loading,
  sendMessage,
  regenerateMessage,
};
}