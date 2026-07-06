import mongoose from "mongoose";

const commandSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    command: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: "powershell",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Command", commandSchema);