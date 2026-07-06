import {
  Server,
  Globe,
  Terminal,
  FileText,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const prompts = [
  {
    icon: <Server size={20} />,
    text: "Explain Active Directory",
  },
  {
    icon: <Globe size={20} />,
    text: "Troubleshoot DNS Server",
  },
  {
    icon: <Terminal size={20} />,
    text: "Generate PowerShell command",
  },
  {
    icon: <FileText size={20} />,
    text: "Analyze Windows Event Logs",
  },
  {
    icon: <Cloud size={20} />,
    text: "Azure VM troubleshooting",
  },
  {
    icon: <ShieldCheck size={20} />,
    text: "Security best practices",
  },
];

export default function SuggestedPrompts({
  onPromptClick,
}) {
  return (
    <div className="mt-8">

      <h3 className="text-center text-slate-400 mb-6">
        Try one of these
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {prompts.map((prompt) => (

          <button
            key={prompt.text}
            onClick={() =>
              onPromptClick(prompt.text)
            }
            className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-4 hover:border-purple-500 hover:bg-slate-800 transition"
          >

            <div className="text-purple-400">
              {prompt.icon}
            </div>

            <span className="text-left">
              {prompt.text}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}