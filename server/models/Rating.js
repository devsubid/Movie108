const mongoose = require("mongoose");
const { Schema } = mongoose;

const ratingSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  rating: Number,
});

module.exports = mongoose.model("Rating", ratingSchema);
