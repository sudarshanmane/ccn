import mongoose from "mongoose";

import { PROD_DB_URL } from "./serverConfig.js";

export default async function connectDB() {
  try {
    let connection;
    connection = await mongoose.connect(PROD_DB_URL);

    if (connection) {
      console.log("database conntected successfully!");
    }
  } catch (error) {
    console.log("Error Connecting the database!", error);
  }
}
