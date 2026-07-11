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

    try {
      let conversation = selectedConversation;

      // Create conversation automatically if none exists
      if (!conversation) {
        const conversationRes = await api.post("/conversations", {
          title:
            text.length > 50
              ? text.substring(0, 50) + "..."
              : text,
        });

        conversation = conversationRes.data.conversation;

        setSelectedConversation(conversation);

        await loadConversations();
      }

      // Show user message immediately
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: text,
        },
      ]);

      // Send to AI
      const chatRes = await api.post("/chat", {
        message: text,
        conversationId: conversation._id,
      });

      // Show AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatRes.data.reply,
        },
      ]);

      // Refresh sidebar history
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

    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (!lastUserMessage) return;

    setLoading(true);

    try {
      // Remove last assistant response
      setMessages((prev) => {
        const updated = [...prev];

        if (
          updated.length > 0 &&
          updated[updated.length - 1].role === "assistant"
        ) {
          updated.pop();
        }

        return updated;
      });

      // Ask AI again
      const chatRes = await api.post("/chat", {
        message: lastUserMessage.content,
        conversationId: selectedConversation._id,
      });

      // Add regenerated response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: chatRes.data.reply,
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