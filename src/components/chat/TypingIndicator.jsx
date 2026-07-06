import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-4">

      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">

        <Bot size={18} />

      </div>

      <div className="bg-slate-800 rounded-2xl px-5 py-4">

        <div className="flex gap-2">

          <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></span>

          <span
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />

          <span
            className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />

        </div>

      </div>

    </div>
  );
}