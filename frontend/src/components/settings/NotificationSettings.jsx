import { useState } from "react";
import toast from "react-hot-toast";
import settingsService from "../../services/settingsService";

export default function NotificationSettings() {

  const [settings, setSettings] = useState({
    email: true,
    browser: true,
    ticketUpdates: true,
    assignmentAlerts: true,
  });

  const [loading, setLoading] = useState(false);

  function toggle(field) {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  async function saveNotifications() {

    try {

      setLoading(true);

      await settingsService.updateNotifications(settings);

      toast.success("Notification settings updated");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to save notification settings"
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Notification Settings
      </h2>

      <div className="space-y-6">

        <NotificationItem
          title="Email Notifications"
          description="Receive updates via email."
          checked={settings.email}
          onChange={() => toggle("email")}
        />

        <NotificationItem
          title="Browser Notifications"
          description="Show browser push notifications."
          checked={settings.browser}
          onChange={() => toggle("browser")}
        />

        <NotificationItem
          title="Ticket Updates"
          description="Notify when ticket status changes."
          checked={settings.ticketUpdates}
          onChange={() => toggle("ticketUpdates")}
        />

        <NotificationItem
          title="Assignment Alerts"
          description="Notify when a ticket is assigned to you."
          checked={settings.assignmentAlerts}
          onChange={() => toggle("assignmentAlerts")}
        />

      </div>

      <button
        onClick={saveNotifications}
        disabled={loading}
        className="mt-10 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Notifications"}
      </button>

    </div>
  );
}

function NotificationItem({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5">

      <div>

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-slate-400">
          {description}
        </p>

      </div>

      <button
        onClick={onChange}
        className={`rounded-full px-5 py-2 text-white transition ${
          checked
            ? "bg-green-600"
            : "bg-slate-700"
        }`}
      >
        {checked ? "ON" : "OFF"}
      </button>

    </div>
  );
}