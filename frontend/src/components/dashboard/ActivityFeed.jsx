import {
  MessageSquare,
  UserPlus,
  CheckCircle,
  XCircle,
  Bell,
} from "lucide-react";

import useNotifications from "../../hooks/useNotifications";

export default function ActivityFeed() {
  const { notifications, loading } = useNotifications();

  const activities = notifications.slice(0, 6);

  function getIcon(type) {
    switch (type) {
      case "ticket_created":
        return (
          <MessageSquare
            size={18}
            className="text-blue-400"
          />
        );

      case "ticket_assigned":
        return (
          <UserPlus
            size={18}
            className="text-yellow-400"
          />
        );

      case "ticket_resolved":
        return (
          <CheckCircle
            size={18}
            className="text-green-400"
          />
        );

      case "ticket_closed":
        return (
          <XCircle
            size={18}
            className="text-red-400"
          />
        );

      default:
        return (
          <Bell
            size={18}
            className="text-purple-400"
          />
        );
    }
  }

  function getColor(priority) {
    switch (priority) {
      case "critical":
        return "border-red-500/20 bg-red-500/10";

      case "high":
        return "border-orange-500/20 bg-orange-500/10";

      case "medium":
        return "border-yellow-500/20 bg-yellow-500/10";

      default:
        return "border-green-500/20 bg-green-500/10";
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-4 sm:p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Latest ticket and system events
          </p>

        </div>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
          {activities.length} Events
        </span>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="flex h-48 items-center justify-center">

          <div className="text-slate-500">
            Loading activity...
          </div>

        </div>

      ) : activities.length === 0 ? (

        <div className="flex h-48 flex-col items-center justify-center">

          <Bell
            size={40}
            className="mb-3 text-slate-600"
          />

          <p className="text-slate-500">
            No Recent Activity
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {activities.map((activity) => (

            <div
              key={activity._id}
              className={`flex flex-col gap-4 rounded-2xl border p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-slate-800/40 sm:flex-row sm:items-center ${getColor(
                activity.priority
              )}`}
            >

              {/* Icon */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900">

                {getIcon(activity.type)}

              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <h3 className="truncate text-base font-semibold text-white">

                    {activity.title}

                  </h3>

                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400 capitalize w-fit">

                    {activity.priority || "Normal"}

                  </span>

                </div>

                <p className="mt-2 break-words text-sm leading-6 text-slate-400">

                  {activity.message}

                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                  <span>

                    {new Date(
                      activity.createdAt
                    ).toLocaleDateString()}

                  </span>

                  <span>•</span>

                  <span>

                    {new Date(
                      activity.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}

                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}