import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import notificationService from "../services/notificationService";
import socket from "../socket";
import { useAuthContext } from "../context/AuthContext";
export default function useNotifications() {
  

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
// console.log("Current User:", user);
useEffect(() => {
  if (!user?.id) return;

  loadNotifications();

  socket.emit("join", user.id);

  socket.on("notification:new", (notification) => {
    toast.success(notification.title);

    setNotifications((prev) => [
      notification,
      ...prev,
    ]);
  });

  return () => {
    socket.off("notification:new");
  };
}, [user]);
async function loadNotifications() {
  try {
    setLoading(true);

    const res = await notificationService.getAll();

    // console.log("Notification API:", res.data);

    setNotifications(res.data.notifications);

  } catch (err) {

    console.error("Notification Error:", err);

    console.error(err.response);

  } finally {
    setLoading(false);
  }
}
async function markRead(id) {
  try {
    await notificationService.markRead(id);

    // Remove notification instantly
    setNotifications((prev) =>
      prev.filter((n) => n._id !== id)
    );

  } catch (err) {
    console.error(err);
    toast.error("Failed to mark notification as read");
  }
}


async function markAllRead() {
  try {
    await notificationService.markAllRead();

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  } catch (err) {
    console.error(err);
  }
}

  async function remove(id) {

    try {

      await notificationService.delete(id);

      setNotifications((prev) =>
        prev.filter((n) => n._id !== id)
      );

    } catch {

      toast.error("Delete failed");

    }

  }

  async function clearAll() {
  try {
    await notificationService.clear();

    setNotifications([]);

  } catch (err) {
    console.error(err);
    toast.error("Failed");
  }
}

  return {

    notifications,

    loading,

    markRead,

    markAllRead,

    remove,

    clearAll,

    refresh: loadNotifications,

  };

}