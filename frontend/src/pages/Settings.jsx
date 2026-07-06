import { useState } from "react";

import {
  User,
  Shield,
  Palette,
  Bell,
  Bot,
  Globe,
  Settings as SettingsIcon,
} from "lucide-react";

import ProfileSettings from "../components/settings/ProfileSettings";
import SecuritySettings from "../components/settings/SecuritySettings";
import AppearanceSettings from "../components/settings/AppearanceSettings";
import NotificationSettings from "../components/settings/NotificationSettings";
import AISettings from "../components/settings/AISettings";
import PreferenceSettings from "../components/settings/PreferenceSettings";
import SystemSettings from "../components/settings/SystemSettings";

import { useAuthContext } from "../context/AuthContext";

export default function Settings() {
  const { user } = useAuthContext();

  const [active, setActive] = useState("profile");

  const menu = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield size={20} />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette size={20} />,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={20} />,
    },
    {
      id: "ai",
      label: "AI Settings",
      icon: <Bot size={20} />,
    },
    {
      id: "preferences",
      label: "Preferences",
      icon: <Globe size={20} />,
    },
  ];

  if (user?.role === "admin") {
    menu.push({
      id: "system",
      label: "System",
      icon: <SettingsIcon size={20} />,
    });
  }

  function renderContent() {
    switch (active) {
      case "profile":
        return <ProfileSettings />;

      case "security":
        return <SecuritySettings />;

      case "appearance":
        return <AppearanceSettings />;

      case "notifications":
        return <NotificationSettings />;

      case "ai":
        return <AISettings />;

      case "preferences":
        return <PreferenceSettings />;

      case "system":
        return <SystemSettings />;

      default:
        return <ProfileSettings />;
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] p-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-2 text-slate-400">
          Manage your account, security, notifications and AI preferences.
        </p>

      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

        {/* Sidebar */}

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">

          <h2 className="mb-5 text-lg font-semibold text-white">
            Settings
          </h2>

          <div className="space-y-2">

            {menu.map((item) => (

              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                  active === item.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item.icon}

                <span>{item.label}</span>

              </button>

            ))}

          </div>

        </div>

        {/* Content */}

        <div className="lg:col-span-3">
          {renderContent()}
        </div>

      </div>

    </div>
  );
}