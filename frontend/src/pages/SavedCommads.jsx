import { Copy, Trash2 } from "lucide-react";
import useSavedCommands from "../hooks/useSavedCommands";

export default function SavedCommands() {
  const {
    commands,
    loading,
    deleteCommand,
  } = useSavedCommands();

  if (loading)
    return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        ⭐ Saved Commands
      </h1>

      {commands.length === 0 ? (
        <p className="text-slate-400">
          No saved commands.
        </p>
      ) : (
        <div className="space-y-5">

          {commands.map((cmd) => (
            <div
              key={cmd._id}
              className="bg-slate-900 rounded-xl p-5"
            >
              <h2 className="font-bold text-lg">
                {cmd.title}
              </h2>

              <p className="text-sm text-purple-400 mb-3">
                {cmd.language}
              </p>

              <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                <code>{cmd.command}</code>
              </pre>

              <div className="flex gap-3 mt-4">

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(cmd.command)
                  }
                  className="flex items-center gap-2 bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600"
                >
                  <Copy size={16} />
                  Copy
                </button>

                <button
                  onClick={() =>
                    deleteCommand(cmd._id)
                  }
                  className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}