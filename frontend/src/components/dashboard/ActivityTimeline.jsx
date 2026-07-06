import { motion } from "framer-motion";
import {
  CheckCircle,
  UserPlus,
  MessageSquare,
  XCircle,
  Clock,
} from "lucide-react";
import useNotifications from "../../hooks/useNotifications";

export default function ActivityTimeline() {
  const { notifications, loading } = useNotifications();

  const activities = notifications.slice(0, 8);

  function getIcon(type) {
    switch (type) {
      case "ticket_created":
        return (
          <MessageSquare
            size={16}
            className="text-blue-400"
          />
        );

      case "ticket_assigned":
        return (
          <UserPlus
            size={16}
            className="text-yellow-400"
          />
        );

      case "ticket_resolved":
        return (
          <CheckCircle
            size={16}
            className="text-green-400"
          />
        );

      case "ticket_closed":
        return (
          <XCircle
            size={16}
            className="text-red-400"
          />
        );

      default:
        return (
          <Clock
            size={16}
            className="text-slate-400"
          />
        );
    }
  }

  function getColor(priority) {
    switch (priority) {
      case "critical":
        return "bg-red-500";

      case "high":
        return "bg-orange-500";

      case "medium":
        return "bg-yellow-500";

      default:
        return "bg-green-500";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-xl"
    >
      <h2 className="mb-8 text-2xl font-bold text-white">
        📅 Activity Timeline
      </h2>

      {loading ? (
        <div className="py-8 text-center text-slate-500">
          Loading...
        </div>
      ) : activities.length === 0 ? (
        <div className="py-8 text-center text-slate-500">
          No Activity Found
        </div>
      ) : (
        <div className="relative ml-3 border-l-2 border-slate-700">

          {activities.map((item) => (

            <div
              key={item._id}
              className="relative mb-8 ml-6"
            >

              <span
                className={`absolute -left-[34px] top-1 flex h-5 w-5 items-center justify-center rounded-full ${getColor(
                  item.priority
                )}`}
              >
                {getIcon(item.type)}
              </span>

              <p className="text-xs text-slate-400">
                {new Date(
                  item.createdAt
                ).toLocaleTimeString()}
              </p>

              <h3 className="mt-1 font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                {item.message}
              </p>

            </div>

          ))}

        </div>
      )}
    </motion.div>
  );
}