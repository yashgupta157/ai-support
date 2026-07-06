import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    user: {
      appearance: {
        theme: {
          type: String,
          default: "light",
        },
        accentColor: {
          type: String,
          default: "#2563eb",
        },
        compactMode: {
          type: Boolean,
          default: false,
        },
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        browser: {
          type: Boolean,
          default: true,
        },
        ticketUpdates: {
          type: Boolean,
          default: true,
        },
        assignmentAlerts: {
          type: Boolean,
          default: true,
        },
      },
      ai: {
        autoCategorize: {
          type: Boolean,
          default: true,
        },
        confidenceThreshold: {
          type: Number,
          default: 0.7,
        },
        responseLength: {
          type: String,
          default: "balanced",
        },
        model: {
          type: String,
          default: "default",
        },
      },
      preferences: {
        language: {
          type: String,
          default: "en",
        },
        timezone: {
          type: String,
          default: "UTC",
        },
        dateFormat: {
          type: String,
          default: "MM/DD/YYYY",
        },
      },
      security: {
        twoFactorEnabled: {
          type: Boolean,
          default: false,
        },
        sessionTimeout: {
          type: Number,
          default: 30,
        },
      },
    },
    system: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Setting = mongoose.model("Setting", settingSchema);

export default Setting;
