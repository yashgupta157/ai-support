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
    <div className="border-t border-slate-800 bg-slate-950 p-4 shrink-0">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-lg font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-white font-semibold">
              {user?.name || "Guest"}
            </h3>

            <p className="truncate text-sm text-slate-400 capitalize">
              {user?.role || "User"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
          <Circle
            size={10}
            fill="currentColor"
            strokeWidth={0}
          />
          Online
        </div>

        <button
          onClick={handleLogout}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-medium transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}