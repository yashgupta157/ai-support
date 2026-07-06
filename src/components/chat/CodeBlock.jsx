import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import toast from "react-hot-toast";

export default function CodeBlock({
  language = "text",
  value,
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(value);

    setCopied(true);
    toast.success("Code copied!");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-700 bg-[#1e1e1e]">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">

        <span className="text-sm font-semibold text-slate-300 uppercase">
          {language}
        </span>

        <button
          onClick={copyCode}
          className="flex items-center gap-2 rounded-lg bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600 transition"
        >
          {copied ? (
            <>
              <Check size={15} />
              Copied
            </>
          ) : (
            <>
              <Copy size={15} />
              Copy
            </>
          )}
        </button>

      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        showLineNumbers
        wrapLongLines
        customStyle={{
          margin: 0,
          borderRadius: 0,
          padding: "18px",
          background: "#1e1e1e",
          fontSize: "14px",
        }}
      >
        {value}
      </SyntaxHighlighter>

    </div>
  );
}