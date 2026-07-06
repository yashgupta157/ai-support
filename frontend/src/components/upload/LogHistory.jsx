import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Eye, Trash2, Search } from "lucide-react";
import useLogs from "../../hooks/useLog";
import { Download } from "lucide-react";
import exportLogPDF from "../../utils/exportLogPDF";

export default function LogHistory() {
  const { logs, loading, deleteLog } = useLogs();

  const [selectedLog, setSelectedLog] = useState(null);
  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter((log) => {
    const keyword = search.toLowerCase();

    return (
      log.filename.toLowerCase().includes(keyword) ||
      log.category.toLowerCase().includes(keyword) ||
      log.severity.toLowerCase().includes(keyword)
    );
  });

  function severityBadge(level) {
    switch (level?.toLowerCase()) {
      case "critical":
        return (
          <span className="px-3 py-1 rounded-full bg-red-600 text-white text-sm">
            🔴 Critical
          </span>
        );

      case "high":
        return (
          <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm">
            🟠 High
          </span>
        );

      case "medium":
        return (
          <span className="px-3 py-1 rounded-full bg-yellow-500 text-black text-sm">
            🟡 Medium
          </span>
        );

      case "low":
        return (
          <span className="px-3 py-1 rounded-full bg-green-600 text-white text-sm">
            🟢 Low
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full bg-slate-600 text-white text-sm">
            ⚪ Unknown
          </span>
        );
    }
  }

  if (loading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 mt-8">
        Loading logs...
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📂 Log History
      </h2>

      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 rounded-xl pl-10 pr-4 py-3 outline-none text-white"
        />

      </div>

      {filteredLogs.length === 0 ? (

        <div className="text-center py-10 text-slate-500">
          No logs found.
        </div>

      ) : (

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left">

              <th className="py-3">File</th>
              <th>Severity</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredLogs.map((log) => (

              <tr
                key={log._id}
                className="border-b border-slate-800 hover:bg-slate-800 transition"
              >

                <td className="py-4 font-medium">
                  {log.filename}
                </td>

                <td>
                  {severityBadge(log.severity)}
                </td>

                <td>
                  {log.category}
                </td>

                <td>
                  {new Date(log.createdAt).toLocaleDateString()}
                </td>

                <td>

                 <div className="flex items-center gap-4">

  {/* View */}
  <button
    onClick={() => setSelectedLog(log)}
    className="text-cyan-400 hover:text-cyan-300"
    title="View Analysis"
  >
    <Eye size={18} />
  </button>

  {/* Download PDF */}
  <button
    onClick={() => exportLogPDF(log)}
    className="text-green-400 hover:text-green-300"
    title="Download PDF"
  >
    <Download size={18} />
  </button>

  {/* Delete */}
  <button
    onClick={() => {
      if (window.confirm("Delete this log?")) {
        deleteLog(log._id);
      }
    }}
    className="text-red-500 hover:text-red-400"
    title="Delete Log"
  >
    <Trash2 size={18} />
  </button>

</div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {selectedLog && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div className="bg-slate-900 rounded-2xl w-4/5 max-h-[85vh] overflow-auto p-8">

            <div className="flex justify-between items-center mb-6">

              <div>

                <h2 className="text-2xl font-bold">
                  {selectedLog.filename}
                </h2>

                <div className="mt-3">
                  {severityBadge(selectedLog.severity)}
                </div>

              </div>

              <button
                onClick={() => setSelectedLog(null)}
                className="text-red-500 text-xl"
              >
                ✕
              </button>

            </div>

            <div className="prose prose-invert max-w-none">

              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedLog.analysis}
              </ReactMarkdown>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}