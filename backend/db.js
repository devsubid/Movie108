const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/movie108";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Hello World! Connected to MongoDB");
  });
};

module.exports = connectToMongo;