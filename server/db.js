const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.CONNECTION_STRING || "mongodb://0.0.0.0:27017/movie";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Express.js: Connected to MongoDB");
  });
};

module.exports = connectToMongo;