import mongoose from "mongoose";

const connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected At ${conn.connection.host}`);
  } catch (error) {
    console.log("Failed to Connect To Database");
  }
};

export default connection;
