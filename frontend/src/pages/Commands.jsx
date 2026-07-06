import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import useCommandGenerator from "../hooks/useCommandGenerator";
import CommandCard from "../components/commands/CommandCard";
export default function Commands() {
  const [prompt, setPrompt] = useState("");

  const {
    loading,
    command,
    generate,
  } = useCommandGenerator();

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        ⚡ AI Command Generator
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Example: Restart DNS Server"
        className="w-full h-40 rounded-xl bg-slate-800 p-4 text-white"
      />

      <button
        onClick={() => generate(prompt)}
        className="mt-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
      >
        {loading ? "Generating..." : "Generate Command"}
      </button>

   {command && (
  <CommandCard
    command={command}
    onExplain={() => {
      // console.log("Explain");
    }}
  />
)}

    </div>
  );
}