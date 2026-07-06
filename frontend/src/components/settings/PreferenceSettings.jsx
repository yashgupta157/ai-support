import { useState } from "react";
import toast from "react-hot-toast";
import settingsService from "../../services/settingsService";

export default function PreferenceSettings() {
  const [settings, setSettings] = useState({
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function savePreferences() {
    try {
      setLoading(true);

      await settingsService.updatePreferences(settings);

      toast.success("Preferences updated");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update preferences"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Preferences
      </h2>

      <div className="space-y-6">

        <div>

          <label className="mb-2 block text-slate-400">
            Language
          </label>

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>French</option>
            <option>German</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            Time Zone
          </label>

          <select
            name="timezone"
            value={settings.timezone}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>Asia/Kolkata</option>
            <option>UTC</option>
            <option>America/New_York</option>
            <option>Europe/London</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            Date Format
          </label>

          <select
            name="dateFormat"
            value={settings.dateFormat}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option>DD/MM/YYYY</option>
            <option>MM/DD/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            Time Format
          </label>

          <select
            name="timeFormat"
            value={settings.timeFormat}
            onChange={handleChange}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          >
            <option value="24h">24 Hour</option>
            <option value="12h">12 Hour</option>
          </select>

        </div>

      </div>

      <button
        onClick={savePreferences}
        disabled={loading}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Preferences"}
      </button>

    </div>
  );
}