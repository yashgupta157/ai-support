import { Bell } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const {
    notifications,
    loading,
    markRead,
  } = useNotifications();

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative rounded-xl bg-slate-900 p-3 hover:bg-slate-800"
      >
        <Bell size={20} />

        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {unread}
          </span>
        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-96 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

          <div className="flex items-center justify-between border-b border-slate-800 p-4">

            <h2 className="font-bold text-white">
              Notifications
            </h2>

            <Link
              to="/notifications"
              onClick={() => setOpen(false)}
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              View All
            </Link>

          </div>

          <div className="max-h-96 overflow-y-auto">

            {loading ? (

              <div className="p-6 text-center text-slate-500">
                Loading...
              </div>

            ) : notifications.length === 0 ? (

              <div className="p-6 text-center text-slate-500">
                No Notifications
              </div>

            ) : (

              notifications.map((item) => (

                <div
                  key={item._id}
                  onClick={() => markRead(item._id)}
                  className={`cursor-pointer border-b border-slate-800 p-4 hover:bg-slate-800 ${
                    item.read ? "" : "bg-slate-800/40"
                  }`}
                >

                  <p className="font-semibold text-white">
                    {item.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {item.message}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>
  );
}