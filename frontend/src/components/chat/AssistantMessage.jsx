import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import CodeBlock from "./CodeBlock";
import MessageActions from "./MessageActions";
import useTypewriter from "../../hooks/useTypewriter";

export default function AssistantMessage({ message }) {
  //  console.log("Message:", message);
  // console.log("Content:", message.content);
  // console.log("Type:", typeof message.content);

  // Convert object -> string
  const content =
    typeof message.content === "string"
      ? message.content
      : JSON.stringify(message.content, null, 2);

  const typedText = useTypewriter(content, 10);

  function formatMarkdown(text = "") {
    return String(text)
      .replace(
        /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
        (match) => `\`${match}\``
      )
      .replace(
        /\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g,
        (match) => `\`${match}\``
      );
  }

  return (
    <div className="flex gap-4 items-start">

      {/* AI Avatar */}
      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
        <Bot size={20} />
      </div>

      {/* Message */}
      <div className="flex-1">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

          <div className="prose prose-invert max-w-none">

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
                    <code className="bg-slate-800 px-1 py-0.5 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {formatMarkdown(typedText)}
            </ReactMarkdown>

            {/* Typing Cursor */}
            {typedText.length < content.length && (
              <span className="animate-pulse text-purple-400 font-bold">
                ▋
              </span>
            )}

          </div>

          <MessageActions content={content} />

        </div>

        <p className="text-xs text-slate-500 mt-2 ml-2">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

      </div>

    </div>
  );
}