import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
  Info,
} from "lucide-react";
import useNotifications from "../../hooks/useNotifications";

export default function RecentAlerts() {
  const { notifications, loading } = useNotifications();

  const alerts = notifications.slice(0, 5);

  function getIcon(type) {
    switch (type) {
      case "ticket_created":
        return (
          <ShieldAlert
            size={20}
            className="text-cyan-400"
          />
        );

      case "ticket_assigned":
        return (
          <TriangleAlert
            size={20}
            className="text-yellow-400"
          />
        );

      case "ticket_resolved":
        return (
          <ShieldCheck
            size={20}
            className="text-green-400"
          />
        );

      case "ticket_closed":
        return (
          <ShieldCheck
            size={20}
            className="text-purple-400"
          />
        );

      default:
        return (
          <Info
            size={20}
            className="text-blue-400"
          />
        );
    }
  }

  function getColor(priority) {
    switch (priority) {
      case "critical":
        return "border-red-500/30 bg-red-500/10";

      case "high":
        return "border-orange-500/30 bg-orange-500/10";

      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10";

      default:
        return "border-green-500/30 bg-green-500/10";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-4 sm:p-6"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            🚨 Recent Alerts
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest security & ticket alerts
          </p>

        </div>

        <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
          {alerts.length} Alerts
        </span>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex h-48 items-center justify-center">

          <p className="text-slate-500">
            Loading alerts...
          </p>

        </div>

      ) : alerts.length === 0 ? (

        <div className="flex h-48 flex-col items-center justify-center">

          <ShieldCheck
            size={40}
            className="mb-3 text-slate-600"
          />

          <p className="text-slate-500">
            No Recent Alerts
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {alerts.map((alert) => (

            <motion.div
              key={alert._id}
              whileHover={{
                scale: 1.02,
              }}
              className={`rounded-2xl border p-4 transition-all duration-300 hover:border-cyan-500/30 ${getColor(
                alert.priority
              )}`}
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                {/* Left */}

                <div className="flex gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900">

                    {getIcon(alert.type)}

                  </div>

                  <div className="min-w-0">

                    <h3 className="break-words text-base font-semibold text-white">

                      {alert.title}

                    </h3>

                    <p className="mt-2 break-words text-sm leading-6 text-slate-300">

                      {alert.message}

                    </p>

                    <span className="mt-3 inline-block rounded-full bg-slate-800 px-3 py-1 text-xs capitalize text-slate-300">

                      {alert.priority || "Normal"} Priority

                    </span>

                  </div>

                </div>

                {/* Time */}

                <div className="shrink-0 text-xs text-slate-500">

                  <div>

                    {new Date(
                      alert.createdAt
                    ).toLocaleDateString()}

                  </div>

                  <div className="mt-1">

                    {new Date(
                      alert.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </motion.div>
  );
}