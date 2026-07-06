import MetricCard from "./MetricCard";
import { useAuthContext } from "../../context/AuthContext";

export default function MetricCards({
  system,
  stats,
  loading,
}) {
  const { user } = useAuthContext();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
className="rounded-3xl border border-slate-800 bg-slate-900 p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* ================= Ticket Statistics ================= */}

<h2 className="mt-2 text-3xl sm:text-4xl font-bold text-white">        🎫 Ticket Overview
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Total Tickets"
          value={stats?.totalTickets}
          subtitle="All Tickets"
          icon={<span className="text-3xl">🎫</span>}
          color="bg-indigo-600"
        />

        <MetricCard
          title="Open"
          value={stats?.openTickets}
          subtitle="Waiting"
          icon={<span className="text-3xl">🟢</span>}
          color="bg-blue-600"
        />

        <MetricCard
          title="In Progress"
          value={stats?.inProgressTickets}
          subtitle="Being Worked"
          icon={<span className="text-3xl">🟡</span>}
          color="bg-amber-600"
        />

        <MetricCard
          title="Resolved"
          value={stats?.resolvedTickets}
          subtitle="Ready to Close"
          icon={<span className="text-3xl">✅</span>}
          color="bg-green-600"
        />

        <MetricCard
          title="Closed"
          value={stats?.closedTickets}
          subtitle="Completed"
          icon={<span className="text-3xl">🔒</span>}
          color="bg-red-600"
        />

        <MetricCard
          title="My Tickets"
          value={stats?.myCreatedTickets}
          subtitle="Created By Me"
          icon={<span className="text-3xl">👤</span>}
          color="bg-purple-600"
        />

        <MetricCard
          title="Assigned"
          value={stats?.myAssignedTickets}
          subtitle="Assigned To Me"
          icon={<span className="text-3xl">🛠️</span>}
          color="bg-cyan-600"
        />

        {user?.role === "admin" && (
          <>
            <MetricCard
              title="Users"
              value={stats?.totalUsers}
              subtitle="Registered Users"
              icon={<span className="text-3xl">👥</span>}
              color="bg-pink-600"
            />

            <MetricCard
              title="Technicians"
              value={stats?.technicians}
              subtitle="Support Staff"
              icon={<span className="text-3xl">👨‍💻</span>}
              color="bg-emerald-600"
            />
          </>
        )}

      </div>

      {/* ================= System Health ================= */}

      <h2 className="mt-10 mb-4 text-2xl font-bold text-white">
        💻 System Health
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <MetricCard
          title="CPU Usage"
          value={system?.cpu}
          suffix="%"
          subtitle="Live Usage"
          icon={<span className="text-3xl">🖥️</span>}
          color="bg-blue-600"
        />

        <MetricCard
          title="RAM Usage"
          value={system?.ram?.percentage}
          suffix="%"
          subtitle={`${system?.ram?.used} GB / ${system?.ram?.total} GB`}
          icon={<span className="text-3xl">💾</span>}
          color="bg-purple-600"
        />

        <MetricCard
          title="Disk Usage"
          value={system?.disk?.used}
          suffix="%"
          subtitle={`${system?.disk?.free} GB Free`}
          icon={<span className="text-3xl">💿</span>}
          color="bg-green-600"
        />

        <MetricCard
          title="Network RX"
          value={system?.network?.rx}
          suffix=" B/s"
          subtitle={`TX: ${system?.network?.tx} B/s`}
          icon={<span className="text-3xl">🌐</span>}
          color="bg-cyan-600"
        />

        <MetricCard
          title="Security Score"
          value={system?.security}
          suffix="%"
          subtitle="Calculated Score"
          icon={<span className="text-3xl">🛡️</span>}
          color="bg-emerald-600"
        />

        <MetricCard
          title="AI Health"
          value={system?.aiHealth ?? 100}
          suffix="%"
          subtitle="Operational"
          icon={<span className="text-3xl">🤖</span>}
          color="bg-pink-600"
        />

      </div>
    </>
  );
}