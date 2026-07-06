import { ShieldCheck } from "lucide-react";

export default function SecurityScore({ score = 91, loading = false }) {
  const display = loading ? 0 : score ?? 0;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-2xl font-bold mb-8">Security Score</h2>

      <div className="flex flex-col items-center">

        <div className="relative w-52 h-52">

          <svg className="w-full h-full rotate-[-90deg]">

            <circle cx="104" cy="104" r="85" stroke="#1e293b" strokeWidth="14" fill="none" />

            <circle
              cx="104"
              cy="104"
              r="85"
              stroke="#22c55e"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={534}
              strokeDashoffset={534 - (534 * (display || 0)) / 100}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <ShieldCheck size={38} className="text-green-400" />

            <h2 className="text-5xl font-bold mt-2">{display}%</h2>

            <p className="text-slate-400">{display >= 90 ? "Excellent" : display >= 75 ? "Good" : "Review"}</p>

          </div>

        </div>

      </div>

    </div>
  );
}