const mongoose = require("mongoose");

const movieSchema = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  rank: {
    type: Number,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  fullTitle: String,
  year: {
    type: Date,
    default: new Date().getFullYear(),
  },
  image: String,
  rating: Number,
  ratingCount: Number,
});

module.exports = mongoose.model("User", movieSchema);
