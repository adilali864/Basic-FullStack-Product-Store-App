import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected at ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting with DB: ${error.message}`);
    process.exit(1); //exit with failure
  }
};
