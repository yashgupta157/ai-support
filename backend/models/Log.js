import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    originalText: {
      type: String,
      required: true,
    },

    analysis: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      default: "Unknown",
    },

    category: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Log", logSchema);