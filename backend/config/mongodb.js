import mongoose from "mongoose";
const connectDB = async () => {

  mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully");
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
  } catch (error) {
    console.error("MongoDB connection failed. Please check your MONGODB_URI in the .env file.");
    console.error("Error details:", error.message);
  }
}


export default connectDB;
