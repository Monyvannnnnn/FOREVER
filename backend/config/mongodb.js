import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected || mongoose.connection.readyState >= 1) {
    isConnected = true;
    return;
  }

  try {
    let uri = process.env.MONGODB_URI || "mongodb+srv://forever_db:Van.310394@cluster0.0s9nhus.mongodb.net";
    uri = uri.replace(/^['"]|['"]$/g, "").trim().replace(/\/+$/, "");

    if (!uri.includes("e-commerce")) {
      uri = `${uri}/e-commerce`;
    }

    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

export default connectDB;
