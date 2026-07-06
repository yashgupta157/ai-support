import api from "./api";

const settingsService = {

  // ==========================
  // Profile
  // ==========================

  getProfile() {
    return api.get("/settings/profile");
  },

  updateProfile(data) {
    return api.put("/settings/profile", data);
  },

  uploadAvatar(formData) {
    return api.put("/settings/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // ==========================
  // Security
  // ==========================

  changePassword(data) {
    return api.put("/settings/password", data);
  },

  toggleTwoFactor(data) {
    return api.put("/settings/2fa", data);
  },

  // ==========================
  // Appearance
  // ==========================

  getAppearance() {
    return api.get("/settings/appearance");
  },

  updateAppearance(data) {
    return api.put("/settings/appearance", data);
  },

  // ==========================
  // Notifications
  // ==========================

  getNotifications() {
    return api.get("/settings/notifications");
  },

  updateNotifications(data) {
    return api.put("/settings/notifications", data);
  },

  // ==========================
  // AI
  // ==========================

  getAISettings() {
    return api.get("/settings/ai");
  },

  updateAISettings(data) {
    return api.put("/settings/ai", data);
  },

  // ==========================
  // Preferences
  // ==========================

  getPreferences() {
    return api.get("/settings/preferences");
  },

  updatePreferences(data) {
    return api.put("/settings/preferences", data);
  },

  // ==========================
  // System (Admin)
  // ==========================

  getSystemSettings() {
    return api.get("/settings/system");
  },

  updateSystemSettings(data) {
    return api.put("/settings/system", data);
  },

  backupDatabase() {
    return api.post("/settings/backup");
  },

  restoreDatabase() {
    return api.post("/settings/restore");
  },
};

export default settingsService;