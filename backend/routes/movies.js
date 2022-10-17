const express = require("express");
const { check, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const movie = require("../models/Movie");
const router = express.Router();

// GET all movies using GET "/api/movies/fetchmovies". Login required
router.get("/fetchmovies", async (req, res) => {
  try {
    const movies = await movie.find();
    res.json(movies);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// POST a movie using POST "/api/movies/add". Login required
router.post(
  "/add",
  fetchUser,
  [
    check("title", "Title is required").isLength({ min: 1 }),
    check("fullTitle", "Full title is required").isLength({ min: 1 }),
    check("image", "Image is required").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, fullTitle, year, image } = req.body;
    try {
      let movieVar = await movie.create({
        user: req.user.id,
        title,
        fullTitle,
        year,
        image,
      });
      res.json(movieVar);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// PUT a movie using PUT "/api/movies/update". Login required
router.put("/update/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, fullTitle, year, image } = req.body;
  try {
    let movieVar = await movie.findById(req.params.id);
    if (!movieVar) {
      return res.status(404).send("Not Found");
    }
    if (movieVar.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    movieVar = await movie.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title,
          fullTitle,
          year,
          image,
        },
      },
      { new: true }
    );
    res.json({ movieVar });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE a movie using DELETE "/api/movies/delete". Login required
router.delete("/delete/:id", fetchUser, async (req, res) => {
  try {
    let movieVar = await movie.findById(req.params.id);
    if (!movieVar) {
      return res.status(404).json({ Success: false, msg: "Not Found" });
    }
    if (movieVar.user.toString() !== req.user.id) {
      return res.status(401).json({ Success: false, msg: "Not Allowed" });
    }
    movieVar = await movie.findByIdAndDelete(req.params.id);
    res.json({ Success: true, msg: "Movie has been deleted", movieVar });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
