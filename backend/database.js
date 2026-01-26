const mongoose = require("mongoose");
require("dotenv").config();
const mongooseUrl = process.env.MONGO_URL;
const ConnectToMongo = async () => {
  try {
    await mongoose.connect(mongooseUrl);
    console.log("Databse connect sucessfully");
  } catch (error) {
    console.log("Database connection failed" + error.message);
  }
};
module.exports = ConnectToMongo;
