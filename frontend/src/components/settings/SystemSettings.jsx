import { useState } from "react";
import toast from "react-hot-toast";
import settingsService from "../../services/settingsService";
import { useAuthContext } from "../../context/AuthContext";

export default function SystemSettings() {

  const { user } = useAuthContext();

  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [logRetention, setLogRetention] = useState(30);

  const [loading, setLoading] = useState(false);

  if (user?.role !== "admin") {
    return (
      <div className="rounded-3xl border border-red-700 bg-red-950 p-8 text-red-300">
        Only administrators can access system settings.
      </div>
    );
  }

  async function saveSystem() {
    try {
      setLoading(true);

      await settingsService.updateSystemSettings({
        maintenanceMode,
        logRetention,
      });

      toast.success("System settings updated");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to save system settings"
      );

    } finally {

      setLoading(false);

    }
  }

  async function backup() {
    try {

      await settingsService.backupDatabase();

      toast.success("Backup started");

    } catch {

      toast.error("Backup failed");

    }
  }

  async function restore() {
    try {

      await settingsService.restoreDatabase();

      toast.success("Restore started");

    } catch {

      toast.error("Restore failed");

    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        System Settings
      </h2>

      <div className="space-y-8">

        <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-5">

          <div>

            <h3 className="text-lg font-semibold text-white">
              Maintenance Mode
            </h3>

            <p className="text-sm text-slate-400">
              Disable access for regular users.
            </p>

          </div>

          <button
            onClick={() =>
              setMaintenanceMode(!maintenanceMode)
            }
            className={`rounded-xl px-5 py-2 text-white ${
              maintenanceMode
                ? "bg-green-600"
                : "bg-slate-700"
            }`}
          >
            {maintenanceMode ? "Enabled" : "Disabled"}
          </button>

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            Log Retention (Days)
          </label>

          <input
            type="number"
            min="1"
            max="365"
            value={logRetention}
            onChange={(e) =>
              setLogRetention(Number(e.target.value))
            }
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <button
            onClick={backup}
            className="rounded-xl bg-green-600 px-6 py-3 text-white"
          >
            Backup Database
          </button>

          <button
            onClick={restore}
            className="rounded-xl bg-amber-600 px-6 py-3 text-white"
          >
            Restore Database
          </button>

        </div>

        <button
          onClick={saveSystem}
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-white"
        >
          {loading ? "Saving..." : "Save System Settings"}
        </button>

      </div>

    </div>
  );
}