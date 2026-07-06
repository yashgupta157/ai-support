import { LogOut, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserCard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  }

  return (
    <div className="border-t border-slate-800 p-5">

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">

        {/* Avatar */}
        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-lg font-bold">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div className="flex-1">

            <h3 className="font-semibold text-white">
              {user?.name}
            </h3>

            <p className="text-sm text-slate-400 capitalize">
              {user?.role}
            </p>

          </div>

        </div>

        {/* Online Status */}

        <div className="mt-4 flex items-center gap-2 text-green-400 text-sm">

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
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 transition py-3"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}