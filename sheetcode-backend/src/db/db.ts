import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose
      .connect(`${process.env.MONGO_URI}/${DB_NAME}`)
      .then(() => {
        const dbName = mongoose.connection.name;
        console.log("✅ Connected to DB:", dbName); // 👈 This will show "SheetCode" if that's correct
      });
    mongoose.connection.on("error", (error) => {
      console.log("ERROR: Application is not able to talk to DB ", error);
    });
    // console.log(
    //   `database connected \n DB_HOST: ${connectionInstance.connection.host}`
    // );
  } catch (error) {
    console.log("ERROR: ", error);
    process.exit(1);
  }
};

export default connectDB;
