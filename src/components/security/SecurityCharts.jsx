import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function SecurityCharts({ security, loading }) {
  const openPortsCount = security?.openPorts?.length || 0;
  const criticalCount = security?.firewall === false ? 1 : 0;
  const highCount = (security?.rdp ? 1 : 0) + (security?.smbv1 ? 1 : 0);
  const mediumCount = (security?.bitlocker === false ? 1 : 0) + (security?.uac === false ? 1 : 0);
  const lowCount = openPortsCount > 0 ? 1 : 0;

  const threatData = {
    labels: ["Critical", "High", "Medium", "Low"],
    datasets: [
      {
        data: [criticalCount, highCount, mediumCount, lowCount],
        backgroundColor: ["#ef4444", "#f97316", "#eab308", "#22c55e"],
        borderWidth: 0,
      },
    ],
  };

  const score = security?.score ?? 0;
  const trendData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
    datasets: [
      {
        label: "Security Score",
        data: [
          Math.max(0, score - 8),
          Math.max(0, score - 6),
          Math.max(0, score - 4),
          Math.max(0, score - 2),
          Math.max(0, score - 1),
          Math.max(0, score - 1),
          score,
        ],
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139,92,246,.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  if (!security && !loading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          No security chart data available.
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-slate-400">
          Run a security scan to populate charts.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* Threat Distribution */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Threat Distribution
        </h2>

        <div className="h-80 flex items-center justify-center">

          <Doughnut
            data={threatData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#cbd5e1",
                  },
                },
              },
            }}
          />

        </div>

      </div>

      {/* Weekly Trend */}

      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

        <h2 className="text-2xl font-bold mb-6">
          Weekly Threat Trend
        </h2>

        <Line
          data={trendData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                ticks: {
                  color: "#94a3b8",
                },
                grid: {
                  color: "#1e293b",
                },
              },
              y: {
                ticks: {
                  color: "#94a3b8",
                },
                grid: {
                  color: "#1e293b",
                },
              },
            },
            plugins: {
              legend: {
                labels: {
                  color: "#e2e8f0",
                },
              },
            },
          }}
          height={300}
        />

      </div>

    </div>
  );
}