const express = require("express");
const Rating = require("../models/Rating");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// ROUTE 1: Get all rating using: GET "/api/rating/fetchrating". no Login required
router.get("/fetchrating/:id", fetchUser, async (req, res) => {
  try {
    const rating = await Rating.find({
      user: req.user.id,
      movieId: req.params.id,
    });
    res.json(rating);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a rating using: POST "/api/rating/add". Login required
router.post("/add/:id", fetchUser, async (req, res) => {
  try {
    const { rating } = req.body;
    let movieId = req.params.id;
    const ratingVar = await Rating.create({
      user: req.user.id,
      movieId,
      rating,
    });
    res.json(ratingVar);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Update a rating using: PUT "/api/rating/update". Login required
router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    const { rating } = req.body;
    let movieId = req.params.id;
    // Create a newRating object
    const newRating = {
      user: req.user.id,
      movieId,
      rating,
    };
    // Find the rating to be updated and update it
    let ratingVar = await Rating.findOne({
      user: req.user.id,
      movieId: req.params.id,
    });
    if (!ratingVar) {
      return res.status(404).send("Not Found");
    }
    if (ratingVar.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    ratingVar = await Rating.findOneAndUpdate(
      { user: req.user.id, movieId: req.params.id },
      {
        $set: newRating,
      }
    );
    res.json({ newRating });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
