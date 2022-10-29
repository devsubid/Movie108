const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.CONNECTION_STRING || "mongodb://localhost:27017/movie108";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Express.js: Connected to MongoDB");
  });
};

module.exports = connectToMongo;