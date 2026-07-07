import { LogOut, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <div className="border-t border-slate-800 p-5 bg-slate-950">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-lg font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="truncate font-semibold text-white">
              {user?.name || "Guest"}
            </h3>

            <p className="truncate text-sm capitalize text-slate-400">
              {user?.role || "User"}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
          <Circle
            size={10}
            fill="currentColor"
            strokeWidth={0}
          />
          Online
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}