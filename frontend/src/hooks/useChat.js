import { useState } from "react";
import api from "../services/api";
import { useConversation } from "../context/ConversationContext";

export default function useChat() {
  const [loading, setLoading] = useState(false);

  const {
    selectedConversation,
    setSelectedConversation,
    loadConversations,
    messages,
    setMessages,
  } = useConversation();

  // ==========================
  // Send Message
  // ==========================
  async function sendMessage(text) {
    if (!text.trim()) return;

    setLoading(true);

    let conversation = selectedConversation;

    try {
      // Create conversation automatically
      if (!conversation) {
        const res = await api.post("/conversations");

        conversation = res.data.conversation;

        setSelectedConversation(conversation);

        await loadConversations();
      }

      // Show user message instantly
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
        },
      ]);

      // Ask AI
      const res = await api.post("/chat", {
        message: text,
        conversationId: conversation._id,
      });

      // Show AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);

      // Refresh history
      await loadConversations();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Regenerate Response
  // ==========================
  async function regenerateMessage() {
    if (!selectedConversation) return;

    const lastUser = [...messages]
      .reverse()
      .find((m) => m.role === "user");

    if (!lastUser) return;

    setLoading(true);

    try {
      // Remove previous assistant reply
      setMessages((prev) => {
        const arr = [...prev];

        if (arr[arr.length - 1]?.role === "assistant") {
          arr.pop();
        }

        return arr;
      });

      // Ask AI again
      const res = await api.post("/chat", {
        message: lastUser.content,
        conversationId: selectedConversation._id,
      });

      // Add new assistant reply
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply,
        },
      ]);

      await loadConversations();

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