import {
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

export default function UserDropdown() {

  const { user } = useAuthContext();
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-2xl bg-slate-900 px-4 py-2"
      >

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div className="text-left">

          <p className="font-semibold">
            {user?.name}
          </p>

          <p className="text-sm text-slate-400">
            {user?.email}
          </p>

        </div>

        <ChevronDown size={18} />

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-slate-700 bg-slate-900">

          <button className="flex w-full items-center gap-3 p-4 hover:bg-slate-800">

            <User size={18} />

            Profile

          </button>

          <button className="flex w-full items-center gap-3 p-4 hover:bg-slate-800">

            <Settings size={18} />

            Settings

          </button>

          <button
            onClick={logout}
            className="flex w-full items-center gap-3 p-4 text-red-400 hover:bg-slate-800"
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      )}

    </div>
  );
}