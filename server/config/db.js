const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb is connected");
  } catch (error) {
    console.log("database error " + error);
    process.exit(1);
  }
};

module.exports = connectDb;
