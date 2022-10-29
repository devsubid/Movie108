const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: String,
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  review: String,
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Review", reviewSchema);
