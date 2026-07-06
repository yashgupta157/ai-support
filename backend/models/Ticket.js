import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },

    reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved", "closed"],
      default: "open",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    tags: [{ type: String }],

    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", default: null },
    suggestedCommands: [{ type: String }],
    resolutionNotes: { type: String, default: "" },

    comments: [commentSchema],

    attachments: [{ type: String }],

    sla: {
      dueDate: { type: Date },
      breached: { type: Boolean, default: false },
    },

    history: [
      {
        event: String,
        by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        at: { type: Date, default: Date.now },
        meta: mongoose.Schema.Types.Mixed,
      },
    ],

    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ticketSchema.index({ status: 1, priority: -1 });

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
