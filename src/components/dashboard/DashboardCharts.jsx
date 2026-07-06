import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import useDashboard from "../../hooks/useDashboard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardCharts() {
  const { stats } = useDashboard();

  const barData = {
    labels: [
      "Conversations",
      "Messages",
      "Logs",
      "Today's Messages",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          stats.totalConversations,
          stats.totalMessages,
          stats.logsUploaded,
          stats.todayMessages,
        ],
        backgroundColor: [
          "#06B6D4", // Cyan
          "#A855F7", // Purple
          "#22C55E", // Green
          "#FACC15", // Yellow
        ],
        borderRadius: 10,
        borderSkipped: false,
      },
    ],
  };

  const doughnutData = {
    labels: [
      "Conversations",
      "Messages",
      "Logs",
    ],
    datasets: [
      {
        data: [
          stats.totalConversations,
          stats.totalMessages,
          stats.logsUploaded,
        ],
        backgroundColor: [
          "#06B6D4",
          "#A855F7",
          "#22C55E",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#334155",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

      <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-5">
          📊 Dashboard Statistics
        </h2>

        <div className="h-80">
          <Bar
            data={barData}
            options={barOptions}
          />
        </div>

      </div>

      <div className="bg-slate-900 rounded-2xl p-6 shadow-lg">

        <h2 className="text-xl font-bold mb-5">
          📈 Distribution
        </h2>

        <div className="h-80">
          <Doughnut
            data={doughnutData}
            options={doughnutOptions}
          />
        </div>

      </div>

    </div>
  );
}