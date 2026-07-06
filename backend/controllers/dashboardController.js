import Conversation from "../models/Conversation.js";
import Chat from "../models/Chat.js";
import Log from "../models/Log.js";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import { getSystemStats } from "../services/systemMonitor.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const [
      totalConversations,
      totalMessages,
      logsUploaded,
      todayMessages,
      systemStats,

      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      closedTickets,

      myCreatedTickets,
      myAssignedTickets,

      totalUsers,
      technicians,
    ] = await Promise.all([
      Conversation.countDocuments({
        user: userId,
      }),

      Chat.countDocuments({
        user: userId,
      }),

      Log.countDocuments({
        user: userId,
      }),

      Chat.countDocuments({
        user: userId,
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      }),

      getSystemStats(),

      // Ticket Statistics
      Ticket.countDocuments(),

      Ticket.countDocuments({
        status: "open",
      }),

      Ticket.countDocuments({
        status: "in_progress",
      }),

      Ticket.countDocuments({
        status: "resolved",
      }),

      Ticket.countDocuments({
        status: "closed",
      }),

      Ticket.countDocuments({
        reporter: userId,
      }),

      Ticket.countDocuments({
        assignee: userId,
      }),

      User.countDocuments(),

      User.countDocuments({
        role: "technician",
      }),
    ]);

    res.json({
      success: true,

      role: req.user.role,

      stats: {
        // Existing dashboard
        totalConversations,
        totalMessages,
        logsUploaded,
        todayMessages,

        // Ticket stats
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        closedTickets,

        // User stats
        myCreatedTickets,
        myAssignedTickets,

        totalUsers,
        technicians,
      },

      system: systemStats,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};