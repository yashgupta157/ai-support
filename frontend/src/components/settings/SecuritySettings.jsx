import { useState } from "react";
import toast from "react-hot-toast";
import settingsService from "../../services/settingsService";

export default function SecuritySettings() {

  const [currentPassword, setCurrentPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [twoFactor, setTwoFactor] = useState(false);

  const [loading, setLoading] = useState(false);

  async function handlePassword(e) {

    e.preventDefault();

    if (!currentPassword || !newPassword) {
      return toast.error("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {

      setLoading(true);

      await settingsService.changePassword({
        currentPassword,
        newPassword,
      });

      toast.success("Password changed");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to change password"
      );

    } finally {

      setLoading(false);

    }
  }

  async function toggle2FA() {

    try {

      await settingsService.toggleTwoFactor({
        enabled: !twoFactor,
      });

      setTwoFactor(!twoFactor);

      toast.success("Security updated");

    } catch {

      toast.error("Failed");

    }
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Security Settings
      </h2>

      <form
        onSubmit={handlePassword}
        className="space-y-5"
      >

        <div>

          <label className="mb-2 block text-slate-400">
            Current Password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            New Password
          </label>

          <input
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        <div>

          <label className="mb-2 block text-slate-400">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-3 text-white"
          />

        </div>

        <button
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </form>

      <hr className="my-10 border-slate-700" />

      <div className="flex items-center justify-between">

        <div>

          <h3 className="text-lg font-semibold text-white">
            Two-Factor Authentication
          </h3>

          <p className="text-sm text-slate-400">
            Protect your account with an extra verification step.
          </p>

        </div>

        <button
          onClick={toggle2FA}
          className={`rounded-xl px-6 py-3 text-white ${
            twoFactor
              ? "bg-green-600"
              : "bg-slate-700"
          }`}
        >
          {twoFactor ? "Enabled" : "Disabled"}
        </button>

      </div>

    </div>
  );
}