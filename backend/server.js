import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import connectDB from "./config/db.js";
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
import http from "http";
import { initSocket } from "./socket/socket.js";

dotenv.config();
// console.log("Mongo URI:", process.env.MONGO_URI);
// console.log("JWT Secret:", process.env.JWT_SECRET);

// console.log("API Key:", process.env.FIREWORKS_API_KEY);

connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-it-support-pro.vercel.app",
  "https://ai-support-hl2t-12dz54ozi-yashgupta11.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
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
app.use("/api/security", securityRoutes);
app.use("/api/network", networkRoutes);
app.use("/api/devices", deviceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/notifications", notificationRoutes);



app.get("/test-cors", (req, res) => {
  res.json({
    success: true,
    origin: req.headers.origin,
  });
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI IT Support Backend Running 🚀",
  });
});
app.get("/models", async (req, res) => {
  try {
    const response = await fetch("https://api.fireworks.ai/inference/v1/models", {
      headers: {
        Authorization: `Bearer ${process.env.FIREWORKS_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
