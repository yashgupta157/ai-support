import { Bot, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 p-5">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">

          <Bot size={24} />

        </div>

        <div>

          <h2 className="text-xl font-bold">
            InfraGPT Assistant
          </h2>

          <p className="text-slate-400 text-sm">
            AI Infrastructure Engineer
          </p>

        </div>

      </div>

      <div className="flex items-center gap-2 text-green-400">

        <Sparkles size={18} />

        <span className="text-sm">
          Online
        </span>

      </div>

    </div>
  );
}