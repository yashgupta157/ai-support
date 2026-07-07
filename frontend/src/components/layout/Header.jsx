import { useState, useEffect, useRef } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  User,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";

export default function Header({ setSidebarOpen }) {
  const { user } = useAuthContext();
  const { logout } = useAuth();

  const {
    notifications,
    markRead,
    markAllRead,
  } = useNotifications();

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#020617]/95 backdrop-blur-xl">

      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Mobile Menu */}

        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl bg-slate-900 p-3 hover:bg-slate-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}

        <div className="relative hidden flex-1 max-w-xl md:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search infrastructure..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-20 text-white outline-none transition focus:border-cyan-500"
          />

          <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-400 lg:block">
            Ctrl + K
          </span>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Notification Section Starts Here */}{/* Notifications */}

<div
  className="relative"
  onMouseEnter={async () => {
    setNotificationOpen(true);

    if (unread > 0) {
      await markAllRead();
    }
  }}
  onMouseLeave={() => setNotificationOpen(false)}
>
  {/* Bell */}

  <button className="relative rounded-xl bg-slate-900 p-3 transition hover:bg-slate-800">

    <Bell size={20} />

    {unread > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
        {unread}
      </span>
    )}

  </button>

  {/* Dropdown */}

  <div
    className={`absolute right-0 top-full mt-3 w-[380px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 ${
      notificationOpen
        ? "visible translate-y-0 opacity-100"
        : "invisible -translate-y-3 opacity-0"
    }`}
  >

    {/* Header */}

    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">

      <h2 className="text-lg font-semibold">
        Notifications
      </h2>

      <Link
        to="/notifications"
        className="text-sm text-cyan-400 hover:text-cyan-300"
      >
        View All
      </Link>

    </div>

    {/* Body */}

    <div className="max-h-[420px] overflow-y-auto">

      {notifications.length ? (

        notifications.slice(0, 5).map((item) => (

          <div
            key={item._id}
            onClick={async () => {
              if (!item.read) {
                await markRead(item._id);
              }
            }}
            className={`cursor-pointer border-b border-slate-800 p-4 transition hover:bg-slate-800 ${
              item.read
                ? ""
                : "bg-slate-800/40"
            }`}
          >

            <h3 className="font-semibold text-white">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-300">
              {item.message}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {new Date(
                item.createdAt
              ).toLocaleString()}
            </p>

          </div>

        ))

      ) : (

        <div className="py-12 text-center text-slate-500">
          No Notifications
        </div>

      )}

    </div>

  </div>

</div>

{/* Profile Starts Here */}{/* Profile */}

<div
  ref={profileRef}
  className="relative"
>
  <button
    onClick={() => setProfileOpen(!profileOpen)}
    className="flex items-center gap-3 rounded-2xl bg-slate-900 px-2 py-2 transition hover:bg-slate-800 sm:px-4"
  >

    {/* Avatar */}

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 font-bold text-white">
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    {/* User */}

    <div className="hidden text-left md:block">

      <h3 className="font-semibold text-white">
        {user?.name}
      </h3>

      <p className="max-w-[180px] truncate text-xs text-slate-400">
        {user?.email}
      </p>

    </div>

    <ChevronDown
      size={18}
      className={`hidden transition duration-300 md:block ${
        profileOpen ? "rotate-180" : ""
      }`}
    />

  </button>

  {/* Dropdown */}

  <div
    className={`absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl transition-all duration-300 ${
      profileOpen
        ? "visible translate-y-0 opacity-100"
        : "invisible -translate-y-3 opacity-0"
    }`}
  >

    <Link
      to="/profile"
      onClick={() => setProfileOpen(false)}
      className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-800"
    >
      <User size={18} />
      Profile
    </Link>

    <Link
      to="/settings"
      onClick={() => setProfileOpen(false)}
      className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-800"
    >
      <Settings size={18} />
      Settings
    </Link>

    <Link
      to="/notifications"
      onClick={() => setProfileOpen(false)}
      className="flex items-center gap-3 px-5 py-4 transition hover:bg-slate-800"
    >
      <Bell size={18} />

      Notifications

      {unread > 0 && (
        <span className="ml-auto rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white">
          {unread}
        </span>
      )}

    </Link>

    <button
      onClick={logout}
      className="flex w-full items-center gap-3 px-5 py-4 text-red-400 transition hover:bg-slate-800"
    >
      <LogOut size={18} />
      Logout
    </button>

  </div>

</div>        </div>
      </div>
    </header>
  );
}