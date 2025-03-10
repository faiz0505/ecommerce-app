const mongoose = require("mongoose");

let isConnected = false;

export const ConnectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection.");
    return;
  }

  try {
    const url = process.env.MONGODB_URI

    // Attempt connection
    const db = await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};