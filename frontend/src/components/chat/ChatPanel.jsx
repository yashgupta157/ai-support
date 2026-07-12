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

    // Upload file later
  }

  return (
    <div
      className="
        relative
        flex
        h-full
        min-h-0
        w-full
        flex-col
        overflow-hidden
        rounded-none
        border-0
        bg-slate-950
        lg:rounded-3xl
        lg:border
        lg:border-slate-800
        lg:shadow-2xl
      "
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <ChatDropzone dragActive={dragActive} />

      <ChatHeader />

      <ChatWindow
        messages={messages}
        loading={loading}
        bottomRef={bottomRef}
        onPromptClick={async (text) => {
          await sendMessage(text);
        }}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
        loading={loading}
      />
    </div>
  );
}