import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./config/db.js";
import { initSocket } from "./socket/socket.js";

import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import commandRoutes from "./routes/commandRoutes.js";
import networkRoutes from "./routes/networkRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);

const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-it-support-pro.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/commands", commandRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI IT Support Backend Running 🚀",
    provider: "OpenRouter",
  });
});

// CORS Test
app.get("/test-cors", (req, res) => {
  res.json({
    success: true,
    origin: req.headers.origin,
  });
});

// OpenRouter Status
app.get("/models", (req, res) => {
  res.json({
    success: true,
    provider: "OpenRouter",
    model: "tencent/hy3:free",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});