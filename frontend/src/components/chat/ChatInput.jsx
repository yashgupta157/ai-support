import { useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Smile,
} from "lucide-react";

export default function ChatInput({
  input,
  setInput,
  handleSend,
  loading,
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [input]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading) {
        handleSend();
      }
    }
  }

  return (
    <div className="border-t border-slate-800 bg-slate-900 p-5">

      <div className="flex items-end gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3">

        {/* Attachment */}

        <button className="text-slate-400 hover:text-white transition">
          <Paperclip size={20} />
        </button>

        {/* Emoji */}

        <button className="text-slate-400 hover:text-white transition">
          <Smile size={20} />
        </button>

        {/* Text Area */}

        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask InfraGPT anything..."
          className="flex-1 resize-none bg-transparent outline-none text-white placeholder:text-slate-500 max-h-40"
        />

        {/* Voice */}

        <button className="text-slate-400 hover:text-white transition">
          <Mic size={20} />
        </button>

        {/* Send */}

        <button
          disabled={loading || !input.trim()}
          onClick={handleSend}
          className="rounded-xl bg-purple-600 p-3 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <Send size={20} />
        </button>

      </div>

      <div className="mt-2 flex justify-between text-xs text-slate-500">

        <span>
          Enter to send • Shift + Enter for new line
        </span>

        <span>{input.length} characters</span>

      </div>

    </div>
  );
}