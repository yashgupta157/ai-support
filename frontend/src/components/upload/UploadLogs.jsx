import { useState } from "react";
import api from "../../services/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { UploadCloud } from "lucide-react";

export default function UploadLogs() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please select a log file.");
      return;
    }

    const formData = new FormData();
    formData.append("log", file);

    try {
      setLoading(true);

      const res = await api.post(
        "/logs/upload",
        formData
      );

      setAnalysis(res.data.log.analysis);

      alert("✅ Log uploaded successfully!");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message || "Upload failed."
      );

    } finally {
      setLoading(false);
    }
  }

  // Detect severity from AI response
  const severity =
    analysis.match(/Critical|High|Medium|Low/i)?.[0] || "";

  function severityBadge(level) {
    switch (level.toLowerCase()) {
      case "critical":
        return (
          <span className="bg-red-600 text-white px-3 py-1 rounded-full font-bold">
            🔴 Critical
          </span>
        );

      case "high":
        return (
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full font-bold">
            🟠 High
          </span>
        );

      case "medium":
        return (
          <span className="bg-yellow-500 text-black px-3 py-1 rounded-full font-bold">
            🟡 Medium
          </span>
        );

      case "low":
        return (
          <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold">
            🟢 Low
          </span>
        );

      default:
        return null;
    }
  }

  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        📂 AI Log Analyzer
      </h2>

      <label className="border-2 border-dashed border-purple-500 rounded-xl p-10 flex flex-col items-center cursor-pointer hover:bg-slate-800 transition">

        <UploadCloud
          size={50}
          className="text-purple-400 mb-4"
        />

        <p className="font-semibold">
          Click to choose a log file
        </p>

        <p className="text-slate-400 text-sm mt-2">
          Supported: .log .txt
        </p>

        {file && (
          <p className="text-green-400 mt-4">
            ✅ {file.name}
          </p>
        )}

        <input
          hidden
          type="file"
          accept=".txt,.log"
          onChange={(e) => setFile(e.target.files[0])}
        />

      </label>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-700 transition py-3 rounded-xl font-semibold"
      >
        {loading
          ? "⏳ AI is analyzing..."
          : "🚀 Upload & Analyze"}
      </button>

      {analysis && (
        <div className="mt-8 bg-slate-800 rounded-xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-2xl font-bold">
              🤖 AI Analysis
            </h3>

            {severityBadge(severity)}

          </div>

          <div className="prose prose-invert max-w-none prose-headings:text-cyan-300 prose-strong:text-white prose-code:text-green-400">

            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {analysis}
            </ReactMarkdown>

          </div>

        </div>
      )}

    </div>
  );
}