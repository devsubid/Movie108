const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rank: {
    type: Number,
    // unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  fullTitle: String,
  year: {
    type: Date,
    default: new Date,
  },
  image: String,
  rating: Number,
  ratingCount: Number,
});

module.exports = mongoose.model("Movie", movieSchema);
