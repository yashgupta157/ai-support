import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

import { classifyTicket } from "../services/ticketClassifier.js";
import { createNotification } from "../services/notificationService.js";

// ======================================================
// List Tickets
// ======================================================

export async function listTickets(req, res) {
  try {
    const {
      status,
      assignee,
      reporter,
      priority,
      reviewed,
      device,
    } = req.query;

    const filter = {
      archived: false,
      status: {
        $ne: "closed",
      },
    };

    if (status) filter.status = status;
    if (assignee) filter.assignee = assignee;
    if (reporter) filter.reporter = reporter;
    if (priority) filter.priority = priority;
    if (device) filter.device = device;

    if (reviewed !== undefined) {

      const reviewEvents = [
        "auto_categorized",
        "auto_categorized_low_confidence",
        "reclassified",
        "reclassified_low_confidence",
      ];

      if (String(reviewed).toLowerCase() === "true") {

        filter.history = {
          $elemMatch: {
            event: {
              $in: reviewEvents,
            },
          },
        };

      } else {

        filter.history = {
          $not: {
            $elemMatch: {
              event: {
                $in: reviewEvents,
              },
            },
          },
        };

      }
    }

    const tickets = await Ticket.find(filter)
      .sort({
        createdAt: -1,
      })
      .populate("reporter", "name email role")
      .populate("assignee", "name email role")
      .populate("device");

    res.json({
      success: true,
      tickets,
    });

  } catch (err) {

    console.error("List Tickets Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// ======================================================
// Get Ticket
// ======================================================

export async function getTicket(req, res) {
  try {

    const ticket = await Ticket.findById(req.params.id)

      .populate("reporter", "name email role")

      .populate("assignee", "name email role")

      .populate("comments.author", "name avatar role")

      .populate("device");

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });

    }

    res.json({
      success: true,
      ticket,
    });

  } catch (err) {

    console.error("Get Ticket Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// ======================================================
// Create Ticket
// ======================================================

export async function createTicket(req, res) {

  try {

    const {
      title,
      description,
      priority,
      status,
      device,
      tags,
      assignee,
    } = req.body;

    const ticket = await Ticket.create({

      title,

      description,

      priority,

      status,

      device: device || null,

      tags,

      assignee: assignee || null,

      reporter: req.user._id,

      history: [

        {
          event: "ticket_created",
          by: req.user._id,
          at: new Date(),
        },

      ],

    });

    // ==========================================
    // Notify every Admin
    // ==========================================

    const admins = await User.find({
      role: "admin",
    });

    for (const admin of admins) {

      await createNotification({

        receiver: admin._id,

        sender: req.user._id,

        title: "New Ticket",

        message: `${ticket.title} created by ${req.user.name}`,

        type: "ticket_created",

        priority: ticket.priority,

        ticket: ticket._id,

      });

    }

    res.status(201).json({

      success: true,

      ticket,

    });

  } catch (err) {

    console.error("Create Ticket Error:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

}

// ======================================================
// AI Categorize Ticket
// ======================================================

export async function categorizeTicket(req, res) {

  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {

      return res.status(404).json({

        success: false,

        message: "Ticket not found",

      });

    }

    const classification = await classifyTicket({

      title: ticket.title,

      description: ticket.description,

    });

    if (classification) {

      const AUTO_APPLY_CONFIDENCE = 0.70;

      if (
        classification.confidence >=
        AUTO_APPLY_CONFIDENCE
      ) {

        if (classification.priority) {

          ticket.priority =
            classification.priority;

        }

        if (classification.tags) {

          ticket.tags = Array.from(

            new Set([

              ...(ticket.tags || []),

              ...classification.tags,

            ])

          );

        }

        ticket.history.push({

          event: "reclassified",

          by: req.user._id,

          meta: classification.raw,

          at: new Date(),

        });

      } else {

        ticket.history.push({

          event:
            "reclassified_low_confidence",

          by: req.user._id,

          meta: classification.raw,

          at: new Date(),

        });

      }

      await ticket.save();

    }

    res.json({

      success: true,

      ticket,

      classification,

    });

  } catch (err) {

    console.error(err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

}// ======================================================
// Update Ticket
// ======================================================

export async function updateTicket(req, res) {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("reporter", "name email role")
      .populate("assignee", "name email role");

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      ticket,
    });

  } catch (err) {

    console.error("Update Ticket Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}

// ======================================================
// Archive Ticket
// ======================================================

export async function archiveTicket(req, res) {

  try {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });

    }

    ticket.archived = true;

    ticket.history.push({
      event: "archived",
      by: req.user._id,
      at: new Date(),
    });

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket archived",
    });

  } catch (err) {

    console.error("Archive Ticket Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

}

// ======================================================
// Add Comment
// ======================================================

export async function addComment(req, res) {

  try {

    const { message } = req.body;

    if (!message) {

      return res.status(400).json({
        success: false,
        message: "Message required",
      });

    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {

      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });

    }

    ticket.comments.push({

      author: req.user._id,

      message,

    });

    ticket.history.push({

      event: "comment_added",

      by: req.user._id,

      at: new Date(),

    });

    await ticket.save();

    // ==================================
    // Notify Reporter & Assignee
    // ==================================

    const receivers = new Set();

    receivers.add(ticket.reporter.toString());

    if (ticket.assignee) {
      receivers.add(ticket.assignee.toString());
    }

    // Don't notify yourself
    receivers.delete(req.user._id.toString());

    for (const receiver of receivers) {

      await createNotification({

        receiver,

        sender: req.user._id,

        title: "New Comment",

        message: `${req.user.name} commented on "${ticket.title}"`,

        type: "ticket_comment",

        priority: ticket.priority,

        ticket: ticket._id,

      });

    }

    await ticket.populate([
      {
        path: "comments.author",
        select: "name avatar role",
      },
    ]);

    res.json({

      success: true,

      ticket,

    });

  } catch (err) {

    console.error("Add Comment Error:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

}

// ======================================================
// Change Status
// ======================================================

export async function changeStatus(req, res) {

  try {

    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {

      return res.status(404).json({

        success: false,

        message: "Ticket not found",

      });

    }

    // Viewer cannot update

    if (req.user.role === "viewer") {

      return res.status(403).json({

        success: false,

        message: "Not allowed",

      });

    }

    // Only Admin can Close

    if (

      status === "closed" &&

      req.user.role !== "admin"

    ) {

      return res.status(403).json({

        success: false,

        message: "Only admin can close tickets.",

      });

    }

    ticket.status = status;

    ticket.history.push({

      event: `status:${status}`,

      by: req.user._id,

      at: new Date(),

    });

    await ticket.save();

    // =========================================
    // Notify on Resolve
    // =========================================

    if (status === "resolved") {

      await createNotification({

        receiver: ticket.reporter,

        sender: req.user._id,

        title: "Ticket Resolved",

        message: `"${ticket.title}" has been resolved.`,

        type: "ticket_resolved",

        priority: ticket.priority,

        ticket: ticket._id,

      });

    }

    // =========================================
    // Notify on Close
    // =========================================

    if (status === "closed") {

      await createNotification({

        receiver: ticket.reporter,

        sender: req.user._id,

        title: "Ticket Closed",

        message: `"${ticket.title}" has been closed.`,

        type: "ticket_closed",

        priority: ticket.priority,

        ticket: ticket._id,

      });

      if (ticket.assignee) {

        await createNotification({

          receiver: ticket.assignee,

          sender: req.user._id,

          title: "Ticket Closed",

          message: `"${ticket.title}" has been closed.`,

          type: "ticket_closed",

          priority: ticket.priority,

          ticket: ticket._id,

        });

      }

    }

    await ticket.populate([
      {
        path: "reporter",
        select: "name email role",
      },
      {
        path: "assignee",
        select: "name email role",
      },
    ]);

    res.json({

      success: true,

      ticket,

    });

  } catch (err) {

    console.error("Change Status Error:", err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

}// ======================================================
// Assign Ticket
// ======================================================

export async function assignTicket(req, res) {
  try {
    const { id } = req.params;
    const { assignee } = req.body;

    // Only Admin can assign
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can assign tickets.",
      });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const technician = await User.findById(assignee);

    if (!technician) {
      return res.status(404).json({
        success: false,
        message: "Technician not found",
      });
    }

    if (
      technician.role !== "technician" &&
      technician.role !== "admin"
    ) {
      return res.status(400).json({
        success: false,
        message: "User is not a technician.",
      });
    }

    ticket.assignee = technician._id;

    ticket.history.push({
      event: "ticket_assigned",
      by: req.user._id,
      at: new Date(),
    });

    await ticket.save();

    await ticket.populate([
      {
        path: "reporter",
        select: "name email role",
      },
      {
        path: "assignee",
        select: "name email role avatar",
      },
    ]);

    // ===========================================
    // Notify Technician
    // ===========================================

    await createNotification({
      receiver: technician._id,
      sender: req.user._id,
      title: "New Ticket Assigned",
      message: `You have been assigned "${ticket.title}"`,
      type: "ticket_assigned",
      priority: ticket.priority,
      ticket: ticket._id,
    });

    res.json({
      success: true,
      ticket,
    });

  } catch (err) {

    console.error("Assign Ticket Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
}