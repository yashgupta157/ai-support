import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  AlertTriangle,
} from "lucide-react";

export default function ThreatCard() {
  return (
    <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Threat Overview
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Latest security status
          </p>
        </div>

        <ShieldAlert
          size={32}
          className="text-red-500"
        />

      </div>

      <div className="space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-3">

            <ShieldAlert
              className="text-red-500"
              size={20}
            />

            <span>Critical</span>

          </div>

          <span className="text-xl font-bold text-red-500">
            0
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-3">

            <AlertTriangle
              className="text-orange-400"
              size={20}
            />

            <span>High</span>

          </div>

          <span className="text-xl font-bold text-orange-400">
            2
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-3">

            <Shield
              className="text-yellow-400"
              size={20}
            />

            <span>Medium</span>

          </div>

          <span className="text-xl font-bold text-yellow-400">
            5
          </span>

        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">

          <div className="flex items-center gap-3">

            <ShieldCheck
              className="text-green-400"
              size={20}
            />

            <span>Safe</span>

          </div>

          <span className="text-xl font-bold text-green-400">
            24
          </span>

        </div>

      </div>

      <div className="mt-6">

        <div className="flex justify-between text-sm mb-2">

          <span>Security Score</span>

          <span className="text-green-400 font-semibold">
            92%
          </span>

        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
            style={{ width: "92%" }}
          />

        </div>

      </div>

    </div>
  );
}