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
      Math.min(textareaRef.current.scrollHeight, 160) + "px";
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
    <div className="shrink-0 border-t border-slate-800 bg-slate-900 p-3 sm:p-5">

      <div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-800 px-3 py-3">

        <button className="text-slate-400 transition hover:text-white">
          <Paperclip size={20} />
        </button>

        <button className="hidden text-slate-400 transition hover:text-white sm:block">
          <Smile size={20} />
        </button>

        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask InfraGPT anything..."
          className="flex-1 resize-none bg-transparent text-white outline-none placeholder:text-slate-500 max-h-40"
        />

        <button className="hidden text-slate-400 transition hover:text-white sm:block">
          <Mic size={20} />
        </button>

        <button
          disabled={loading || !input.trim()}
          onClick={handleSend}
          className="rounded-xl bg-purple-600 p-3 transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={20} />
        </button>

      </div>

      <div className="mt-2 hidden justify-between text-xs text-slate-500 sm:flex">
        <span>Enter to send • Shift + Enter for new line</span>
        <span>{input.length} characters</span>
      </div>

    </div>
  );
}