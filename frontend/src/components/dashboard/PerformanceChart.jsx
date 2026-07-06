import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";

export default function PerformanceChart({
  system,
  loading,
}) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!system) return;

    setHistory((prev) => {
      const next = [
        ...prev,
        {
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          cpu: system.cpu,
          ram: system.ram.percentage,
          disk: system.disk.used,
        },
      ];

      return next.slice(-20);
    });
  }, [system]);

  if (loading || !system) {
    return (
      <div className="h-64 sm:h-80 lg:h-[420px] animate-pulse rounded-3xl border border-slate-800 bg-slate-900" />
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-4 sm:p-6 backdrop-blur-xl">

      {/* Header */}

      <div className="mb-4 flex flex-col gap-1 sm:mb-6">

        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Live Performance
        </h2>

        <p className="text-sm text-slate-400 sm:text-base">
          Updates every 5 seconds
        </p>

      </div>

      {/* Chart */}

      <div className="h-64 sm:h-80 lg:h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={history}
            margin={{
              top: 10,
              right: 15,
              left: -15,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke="#334155"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
              stroke="#94A3B8"
              tick={{
                fontSize: 10,
              }}
              interval="preserveStartEnd"
            />

            <YAxis
              stroke="#94A3B8"
              tick={{
                fontSize: 10,
              }}
              width={35}
            />

            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: 12,
                color: "#fff",
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: 12,
              }}
            />

            <Line
              type="monotone"
              dataKey="cpu"
              name="CPU"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="ram"
              name="RAM"
              stroke="#A855F7"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="disk"
              name="Disk"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}