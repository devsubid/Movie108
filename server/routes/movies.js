const express = require("express");
const { validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchUser");
const movie = require("../models/Movie");
const Review = require("../models/Reviews");
const Rating = require("../models/Rating");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Storage = multer.diskStorage({
  destination: "Images/",
  filename: (req, file, callback) => {
    callback(
      null,
      Date.now() + Math.round(Math.random() * 1000000000) + file.originalname
    );
  },
});

const upload = multer({ storage: Storage }).single("image");

// GET all movies using GET "/api/movies/fetchmovies". no Login required
router.get("/fetchmovies/pageno=:page", async (req, res) => {
  try {
    const movies = await movie
      .find()
      .select("-__v -date -description")
      .skip((req.params.page - 1) * 10)
      .limit(10);
    const totalPages = (await movie.countDocuments()) / 10;
    res.json({
      movies,
      totalPages,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET search movies using GET "/api/movies/searchmovies/:text". no Login required
router.get("/searchmovies/:text", async (req, res) => {
  try {
    const movies = await movie.find({
      $or: [
        { title: { $regex: req.params.text, $options: "i" } },
        { description: { $regex: req.params.text, $options: "i" } },
      ],
    });
    if (!movies) {
      return res.status(404).send("Not Found");
    }
    res.json(movies);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// GET specific movie using GET "/api/movies/getmovie/:id". no Login required
router.get("/getmovie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const movies = await movie.findById(movieId);
    if (!movies) {
      return res.status(404).send("Not Found");
    }
    res.json(movies);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// POST a movie using POST "/api/movies/add". Login required
router.post("/add", fetchUser, async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    let { title, description, date } = req.body;
    try {
      let movieVar = await movie.create({
        title,
        description,
        date,
        image: {
          data: fs.readFileSync(
            path.join(__dirname + "/../Images/" + req.file.filename)
          ),
          contentType: "image/jpeg,image/jpg,image/png",
        },
      });
      res.json(movieVar);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
});

// PUT a movie using PUT "/api/movies/update". Login required
router.put("/update/:id", fetchUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { title, year, image } = req.body;
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
          year,
          image,
        },
      },
      { new: true }
    );
    res.json({ movieVar });
  } catch (error) {
    console.log(error.message);
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
    movieVar = await movie.findByIdAndDelete(req.params.id);
    await Review.findOneAndDelete({
      movieId: req.params.id,
    });
    await Rating.findOneAndDelete({
      movieId: req.params.id,
    });
    res.json({ Success: true, msg: "Movie has been deleted", movieVar });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
