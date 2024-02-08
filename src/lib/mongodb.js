import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    console.log("mongouri", process.env.MONGODB_URI);
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB connection FAILED\n ", error);
  }
};
