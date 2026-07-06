import { useState, useEffect } from "react";
import { Camera, Save } from "lucide-react";
import useSettings from "../../hooks/useSettings";

export default function ProfileSettings() {
  const {
    profile,
    loading,
    saving,
    saveProfile,
    uploadAvatar,
  } = useSettings();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        role: profile.role || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await saveProfile({
      name: form.name,
      phone: form.phone,
    });
  }

  async function handleAvatar(e) {
    const file = e.target.files[0];

    if (!file) return;

    await uploadAvatar(file);
  }

  if (loading) {
    return (
      <div className="rounded-3xl bg-slate-900 p-8 text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-8 text-3xl font-bold text-white">
        Profile Settings
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Avatar */}

        <div className="flex items-center gap-6">

          <img
            src={
              profile?.avatar ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(form.name)
            }
            alt="avatar"
            className="h-28 w-28 rounded-full border-4 border-slate-700 object-cover"
          />

          <label className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">

            <div className="flex items-center gap-2">

              <Camera size={18} />

              Change Avatar

            </div>

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleAvatar}
            />

          </label>

        </div>

        {/* Name */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Full Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Email
          </label>

          <input
            value={form.email}
            readOnly
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-400"
          />

        </div>

        {/* Role */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Role
          </label>

          <input
            value={form.role}
            readOnly
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-400"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Phone
          </label>

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

        </div>

        {/* Save */}

        <button
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >

          <Save size={18} />

          {saving ? "Saving..." : "Save Changes"}

        </button>

      </form>

    </div>
  );
}