import { User } from "lucide-react";

export default function UserMessage({ message }) {
  return (
    <div className="flex justify-end gap-4">

      {/* Message */}

      <div className="flex flex-col items-end max-w-[75%]">

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl px-5 py-4 text-white shadow-lg">

          <p className="whitespace-pre-wrap break-words">
            {message.content}
          </p>

        </div>

        <p className="text-xs text-slate-500 mt-2 mr-2">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

      </div>

      {/* Avatar */}

      <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">

        <User size={18} />

      </div>

    </div>
  );
}