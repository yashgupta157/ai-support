import Notification from "../models/Notification.js";

// =====================================
// Get All Notifications
// =====================================

export async function getNotifications(req, res) {
  try {
    const notifications = await Notification.find({
      receiver: req.user._id,
    })
      .populate("sender", "name email avatar role")
      .populate("ticket", "title status priority")
      .populate("device", "hostname ipAddress")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      notifications,
    });

  } catch (err) {

    console.error("Get Notifications Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// =====================================
// Get Unread Notifications
// =====================================

export async function getUnreadNotifications(req, res) {
  try {

    const notifications = await Notification.find({
      receiver: req.user._id,
      read: false,
    })
      .populate("sender", "name email avatar")
      .populate("ticket", "title")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: notifications.length,
      notifications,
    });

  } catch (err) {

    console.error("Unread Notifications Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// =====================================
// Mark Single Notification Read
// =====================================

export async function markAsRead(req, res) {
  try {

    const notification = await Notification.findOne({
      _id: req.params.id,
      receiver: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.read = true;

    await notification.save();

    res.json({
      success: true,
      notification,
    });

  } catch (err) {

    console.error("Mark Read Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// =====================================
// Mark All Read
// =====================================

export async function markAllRead(req, res) {
  try {

    await Notification.updateMany(
      {
        receiver: req.user._id,
        read: false,
      },
      {
        read: true,
      }
    );

    res.json({
      success: true,
      message: "All notifications marked as read",
    });

  } catch (err) {

    console.error("Mark All Read Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// =====================================
// Delete Notification
// =====================================

export async function deleteNotification(req, res) {
  try {

    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      receiver: req.user._id,
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.json({
      success: true,
      message: "Notification deleted",
    });

  } catch (err) {

    console.error("Delete Notification Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// =====================================
// Clear All Notifications
// =====================================

export async function clearNotifications(req, res) {
  try {

    await Notification.deleteMany({
      receiver: req.user._id,
    });

    res.json({
      success: true,
      message: "All notifications cleared",
    });

  } catch (err) {

    console.error("Clear Notifications Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}