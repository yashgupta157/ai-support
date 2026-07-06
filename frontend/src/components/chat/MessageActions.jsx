import {
  Copy,
  Check,
  RotateCcw,
  Pencil,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function MessageActions({
  content,
  onRegenerate,
  onEdit,
}) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(content);

    setCopied(true);
    toast.success("Copied");

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-2 mt-4">

      <button
        onClick={copyMessage}
        className="p-2 rounded-lg hover:bg-slate-800 transition"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>

      <button className="p-2 rounded-lg hover:bg-slate-800 transition">
        <ThumbsUp size={18} />
      </button>

      <button className="p-2 rounded-lg hover:bg-slate-800 transition">
        <ThumbsDown size={18} />
      </button>

      <button
        onClick={onRegenerate}
        className="p-2 rounded-lg hover:bg-slate-800 transition"
      >
        <RotateCcw size={18} />
      </button>

      {onEdit && (
        <button
          onClick={onEdit}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Pencil size={18} />
        </button>
      )}

    </div>
  );
}