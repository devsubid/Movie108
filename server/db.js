const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://movie108-main-db-03617103f62:5hdKH93c1d2MpJb1KdUCs4f3WPYcPb@prod-us-central1-1.lfuy1.mongodb.net/movie108-main-db-03617103f62";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("Express.js: Connected to MongoDB");
  });
};

module.exports = connectToMongo;