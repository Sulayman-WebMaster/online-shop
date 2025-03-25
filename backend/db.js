import mongoose from "mongoose";
export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.DB);
      console.log(`MongoDB Connected`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
