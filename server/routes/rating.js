const express = require("express");
const Rating = require("../models/Rating");
const fetchUser = require("../middleware/fetchUser");
const mongoose = require("mongoose");
const router = express.Router();

// ROUTE 1: Get all rating using: GET "/api/rating/fetchrating". no Login required
router.get("/fetchrating/:id", async (req, res) => {
  try {
    const rating = await Rating.find({
      movieId: req.params.id,
    }).countDocuments();
    const avgRating = await Rating.aggregate([
      {
        $match: {
          movieId: mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $group: {
          _id: null,
          avgRating: {
            $avg: "$rating",
          },
        },
      },
    ]);
    res.json({
      rating,
      avgRating,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Get user rating using: GET "/api/rating/fetchuserrating". Login required
router.get("/fetchuserrating/:id", fetchUser, async (req, res) => {
  try {
    const rating = await Rating.find({
      user: req.user.id,
      movieId: req.params.id,
    });
    res.json({ rating: rating });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Add a rating using: POST "/api/rating/add". Login required
router.post("/add/:id", fetchUser, async (req, res) => {
  try {
    const { rating } = req.body;
    let movieId = req.params.id;
    const ratingExisting = await Rating.findOne({
      user: req.user.id,
      movieId: req.params.id,
    });
    if (ratingExisting) {
      const ratingVar = await Rating.findOneAndUpdate(
        {
          user: req.user.id,
          movieId: req.params.id,
        },
        { $set: { rating: req.body.rating } }
      );
      res.status(200);
    } else {
      const ratingVar = await Rating.create({
        user: req.user.id,
        movieId,
        rating,
      });
      res.status(200);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
