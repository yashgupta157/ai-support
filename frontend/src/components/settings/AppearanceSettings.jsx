import { useState } from "react";
import toast from "react-hot-toast";
import settingsService from "../../services/settingsService";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState("dark");
  const [accentColor, setAccentColor] = useState("#7c3aed");
  const [compactMode, setCompactMode] = useState(false);
  const [loading, setLoading] = useState(false);

  async function saveAppearance() {
    try {
      setLoading(true);

      await settingsService.updateAppearance({
        theme,
        accentColor,
        compactMode,
      });

      toast.success("Appearance updated");

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to save appearance"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Appearance
      </h2>

      {/* Theme */}

      <div className="mb-8">

        <label className="mb-3 block text-slate-400">
          Theme
        </label>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="w-full rounded-xl bg-slate-800 p-3 text-white"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

      </div>

      {/* Accent Color */}

      <div className="mb-8">

        <label className="mb-3 block text-slate-400">
          Accent Color
        </label>

        <input
          type="color"
          value={accentColor}
          onChange={(e) => setAccentColor(e.target.value)}
          className="h-14 w-28 cursor-pointer rounded-lg border-none bg-transparent"
        />

      </div>

      {/* Compact Mode */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            Compact Mode
          </h3>

          <p className="text-sm text-slate-400">
            Reduce spacing across the application.
          </p>

        </div>

        <button
          onClick={() => setCompactMode(!compactMode)}
          className={`rounded-xl px-6 py-2 text-white ${
            compactMode
              ? "bg-green-600"
              : "bg-slate-700"
          }`}
        >
          {compactMode ? "Enabled" : "Disabled"}
        </button>

      </div>

      <button
        disabled={loading}
        onClick={saveAppearance}
        className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Appearance"}
      </button>

    </div>
  );
}