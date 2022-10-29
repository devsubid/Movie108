const express = require("express");
const Review = require("../models/Reviews");
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

// ROUTE 1: Get all reviews using: GET "/api/review/fetchreviews". no Login required
router.get("/fetchreviews/:id", async (req, res) => {
  try {
    const reviews = await Review.find({
      movieId: req.params.id,
    });
    res.json(reviews);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a review using: POST "/api/review/add". Login required
router.post("/add/:id", fetchUser, async (req, res) => {
  try {
    const { review } = req.body;
    let movieId = req.params.id;
    let user = await User.findById(req.user.id);
    const reviewVar = await Review.create({
      user: req.user.id,
      userName: user.name,
      movieId,
      review,
    });
    res.status(200).json(reviewVar);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Edit review using: PUT "/api/review/update". Login required
router.put("/update/:id", fetchUser, async (req, res) => {
  try {
    const { review } = req.body;
    let movieId = req.params.id;
    const reviewVar = await Review.findOneAndUpdate(
      { movieId: movieId, user: req.user.id },
      { review: review }
    );
    res.json(reviewVar);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
