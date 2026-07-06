import { useContext } from "react";
import { NetworkContext } from "../../context/NetworkContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../chat/CodeBlock";

export default function ResultCard() {
  const { result } = useContext(NetworkContext);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-4">
        Results
      </h2>

      {result ? (

        <div className="whitespace-pre-wrap text-green-400 overflow-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");

                if (match) {
                  return (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, "")}
                    />
                  );
                }

                return (
                  <code className="bg-slate-700 px-1 rounded">
                    {children}
                  </code>
                );
              },
            }}
          >
            {typeof result === "string"
              ? result
              : "```json\n" + JSON.stringify(result, null, 2) + "\n```"}
          </ReactMarkdown>
        </div>

      ) : (

        <p className="text-slate-500">
          No results yet.
        </p>

      )}

    </div>
  );
}