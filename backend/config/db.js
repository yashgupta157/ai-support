import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    // console.log("✅ MongoDB Connected");
    // console.log("Host:", conn.connection.host);
    // console.log("Database:", conn.connection.name);

  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
    process.exit(1);
  }
}

export default connectDB;