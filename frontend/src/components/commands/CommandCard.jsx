import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "../chat/CodeBlock";
import MessageActions from "../chat/MessageActions";

export default function CommandCard({
  command,
  onExplain,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match =
              /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, "")}
                />
              );
            }

            return (
              <code className="bg-slate-700 px-1 py-0.5 rounded">
                {children}
              </code>
            );
          },
        }}
      >
        {command}
      </ReactMarkdown>

      <MessageActions
        content={command}
        onRegenerate={onExplain}
      />

    </div>
  );
}