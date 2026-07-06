import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
const ConversationContext = createContext();

export const useConversation = () => useContext(ConversationContext);

export function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);



 async function loadConversations() {
  try {
  const res = await api.get("/conversations");
    setConversations(res.data.conversations);

    if (
      res.data.conversations.length > 0 &&
      !selectedConversation
    ) {
      const firstConversation = res.data.conversations[0];

      setSelectedConversation(firstConversation);

      await loadMessages(firstConversation._id);
    }
  } catch (err) {
    console.error(err);
  }
}
 async function newConversation() {
  try {
    const res = await api.post("/conversations");

    setConversations((prev) => [
      res.data.conversation,
      ...prev,
    ]);

    setSelectedConversation(res.data.conversation);
    setMessages([]);

    toast.success("New conversation created");

  } catch (err) {
    console.error(err);
    toast.error("Failed to create conversation");
  }
}
async function renameConversation(id, title) {
  try {
    const res = await api.put(
      `/conversations/${id}`,
      { title }
    );

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
async function deleteConversation(id) {
  try {
    await api.delete(`/conversations/${id}`);

    const updated = conversations.filter(
      (conversation) => conversation._id !== id
    );

    setConversations(updated);

    if (selectedConversation?._id === id) {
      if (updated.length > 0) {
        setSelectedConversation(updated[0]);
        await loadMessages(updated[0]._id);
      } else {
        setSelectedConversation(null);
        setMessages([]);
      }
    }

    toast.success("Conversation deleted");

  } catch (err) {
    console.error(err);
    toast.error("Delete failed");
  }
}
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
