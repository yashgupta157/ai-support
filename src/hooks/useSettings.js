import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import settingsService from "../services/settingsService";

export default function useSettings() {

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      setLoading(true);

      const res = await settingsService.getProfile();

      setProfile(res.data.profile);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load profile");

    } finally {

      setLoading(false);

    }

  }

  async function saveProfile(data) {

    try {

      setSaving(true);

      const res = await settingsService.updateProfile(data);

      setProfile(res.data.profile);

      toast.success("Profile updated");

    } catch (err) {

      console.error(err);

      toast.error("Update failed");

    } finally {

      setSaving(false);

    }

  }

  async function uploadAvatar(file) {

    try {

      const formData = new FormData();

      formData.append("avatar", file);

      const res = await settingsService.uploadAvatar(formData);

      setProfile(res.data.profile);

      toast.success("Avatar updated");

    } catch (err) {

      console.error(err);

      toast.error("Avatar upload failed");

    }

  }

  return {

    profile,

    loading,

    saving,

    loadProfile,

    saveProfile,

    uploadAvatar,

  };

}