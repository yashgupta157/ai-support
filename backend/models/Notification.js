import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "ticket_created",
        "ticket_assigned",
        "ticket_resolved",
        "ticket_closed",
        "ticket_comment",
        "device_added",
        "device_offline",
        "security_alert",
        "system",
        "ai",
        "chat",
      ],
      default: "system",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
        "critical",
      ],
      default: "medium",
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: null,
    },

    device: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      default: null,
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Notification",
  notificationSchema
);