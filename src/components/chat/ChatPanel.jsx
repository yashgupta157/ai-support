import { useState, useEffect, useRef } from "react";

import useChat from "../../hooks/useChat";

import ChatHeader from "./ChatHeader";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ChatDropzone from "./ChatDropzone";

export default function ChatPanel() {
  const [input, setInput] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const {
    messages,
    loading,
    sendMessage,
  } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function handleSend() {
    if (!input.trim()) return;

    await sendMessage(input);

    setInput("");
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragActive(false);
  }

  async function handleDrop(e) {
    e.preventDefault();

    setDragActive(false);

    const file = e.dataTransfer.files[0];

    if (!file) return;

    // console.log("Dropped File:", file);

    // 🚀 Next step:
    // Upload file to backend
    // const formData = new FormData();
    // formData.append("file", file);
    // await uploadLog(formData);
  }

  return (
    <div
      className="relative h-[75vh] rounded-3xl border border-slate-800 bg-slate-950 flex flex-col overflow-hidden shadow-2xl"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag Overlay */}
      <ChatDropzone dragActive={dragActive} />

      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <ChatWindow
        messages={messages}
        loading={loading}
        bottomRef={bottomRef}
        onPromptClick={async (text) => {
          await sendMessage(text);
        }}
      />

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
      />
    </div>
  );
}