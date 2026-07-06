import api from "./api";

const notificationService = {
  // Get all notifications
  getAll() {
    return api.get("/notifications");
  },

  // Get unread notifications
  getUnread() {
    return api.get("/notifications/unread");
  },

  // Mark one notification as read
  markRead(id) {
    return api.patch(`/notifications/${id}/read`);
  },

  // Mark all notifications as read
  markAllRead() {
    return api.patch("/notifications/read-all");
  },

  // Delete one notification
  delete(id) {
    return api.delete(`/notifications/${id}`);
  },

  // Delete all notifications
  clear() {
    return api.delete("/notifications/clear");
  },
};

export default notificationService;