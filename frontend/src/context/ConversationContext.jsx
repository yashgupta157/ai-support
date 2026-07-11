import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  // ==========================
  // Load Conversations
  // ==========================
  async function loadConversations() {
    try {
      const res = await api.get("/conversations");
      setConversations(res.data.conversations);
    } catch (err) {
      console.error(err);
    }
  }

  // ==========================
  // Create Conversation
  // ==========================
  async function newConversation(title = "Untitled") {
    try {
      const res = await api.post("/conversations", { title });

      setConversations((prev) => [
        res.data.conversation,
        ...prev,
      ]);

      setSelectedConversation(res.data.conversation);
      setMessages([]);

      return res.data.conversation;

    } catch (err) {
      console.error(err);
      toast.error("Failed to create conversation");
      return null;
    }
  }

  // ==========================
  // Rename Conversation
  // ==========================
  async function renameConversation(id, title) {
    try {
      const res = await api.put(`/conversations/${id}`, {
        title,
      });

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation._id === id
            ? res.data.conversation
            : conversation
        )
      );

      toast.success("Conversation renamed");

    } catch (err) {
      console.error(err);
      toast.error("Rename failed");
    }
  }

  // ==========================
  // Delete Conversation
  // ==========================
  async function deleteConversation(id) {
    try {
      await api.delete(`/conversations/${id}`);

      const updated = conversations.filter(
        (conversation) => conversation._id !== id
      );

      setConversations(updated);

      if (selectedConversation?._id === id) {
        setSelectedConversation(null);
        setMessages([]);
      }

      toast.success("Conversation deleted");

    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  }

  // ==========================
  // Load Messages
  // ==========================
  async function loadMessages(conversationId) {
    try {
      const res = await api.get(
        `/conversations/${conversationId}/messages`
      );

      setMessages(res.data.messages);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        selectedConversation,
        setSelectedConversation,
        newConversation,
        renameConversation,
        deleteConversation,
        loadConversations,
        messages,
        setMessages,
        loadMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}