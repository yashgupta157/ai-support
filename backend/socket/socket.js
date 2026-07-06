import { Server } from "socket.io";

let io;

// ================================
// Initialize Socket.IO
// ================================

export function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    // console.log(`🟢 Connected: ${socket.id}`);

    // =====================================
    // Join User Room
    // =====================================

    socket.on("join", (userId) => {
      if (!userId) return;

      socket.join(String(userId));

      // console.log(
      //   `👤 User ${userId} joined room`
      // );
    });

    // =====================================
    // Leave Room
    // =====================================

    socket.on("leave", (userId) => {
      if (!userId) return;

      socket.leave(String(userId));

      // console.log(
      //   `🚪 User ${userId} left room`
      // );
    });

    // =====================================
    // Join Chat Room (Future)
    // =====================================

    socket.on("chat:join", (roomId) => {
      socket.join(`chat:${roomId}`);
    });

    socket.on("chat:leave", (roomId) => {
      socket.leave(`chat:${roomId}`);
    });

    // =====================================
    // Disconnect
    // =====================================

    socket.on("disconnect", () => {
      // console.log(`🔴 Disconnected: ${socket.id}`);
    });
  });

  return io;
}

// ================================
// Get Socket Instance
// ================================

export function getIO() {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized."
    );
  }

  return io;
}

// ================================
// Notification
// ================================

export function emitNotification(
  userId,
  notification
) {
  if (!io) return;

  io.to(String(userId)).emit(
    "notification:new",
    notification
  );
}

// ================================
// Ticket Updates
// ================================

export function emitTicketUpdate(ticket) {
  if (!io) return;

  io.emit("ticket:update", ticket);
}

// ================================
// Dashboard Updates
// ================================

export function emitDashboardUpdate(data) {
  if (!io) return;

  io.emit("dashboard:update", data);
}

// ================================
// User Status
// ================================

export function emitUserStatus(data) {
  if (!io) return;

  io.emit("user:status", data);
}