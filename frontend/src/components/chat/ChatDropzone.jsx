import { UploadCloud } from "lucide-react";

export default function ChatDropzone({
  dragActive,
}) {
  if (!dragActive) return null;

  return (
    <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center">

      <div className="border-2 border-dashed border-purple-500 rounded-3xl p-16 text-center">

        <UploadCloud
          size={60}
          className="mx-auto text-purple-400 mb-6"
        />

        <h2 className="text-3xl font-bold">
          Drop your log file
        </h2>

        <p className="text-slate-400 mt-3">
          .log .txt .evtx .csv .json
        </p>

      </div>

    </div>
  );
}