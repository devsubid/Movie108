const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "dkHE6GAXFBP9KoNlrTYZhfC43jvzRyMw";

// SIGNUP ROUTE: Create a new user using POST "/api/users/signup"
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    try {
      // search if user already exists
      let user = await User.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      // hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Create a new user
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authToken = jwt.sign(data, JWT_SECRET);
          res.json({ authToken });
        })
        .catch((err) =>
          res.status(500).json({
            success: false,
            error: "Internal Server Error",
            msg: err.message,
          })
        );
    } catch {
      console.log(err.message);
      res.status(500).send("Internal Server Error!\nSomething went wrong!");
    }
  }
);

// LOGIN ROUTE: Authenticate a user using POST "/api/users/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      ({ email, password } = req.body);
      let user = await User.findOne({ email: email });
      // If user does not exist, return bad request and error
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with valid email and password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      // If password does not match, return bad request and error
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please login with valid email and password" });
      }
      // Create a new JWT token and return it
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ authToken });
    } catch {
      console.log(err.message);
      res.status(500).send("Internal Server Error!\nSomething went wrong!");
    }
  }
);

// GET USER DETAILS ROUTE: Get logged in user details using POST "/api/users/getuser"
router.post("/getuser", fetchUser, async (req, res) => {
  try {
    // Get user details from the database
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error!\nSomething went wrong!");
  }
});

// GET USERNAME ROUTE: Get username using POST "/api/users/getusername"
router.post("/getusername", fetchUser, async (req, res) => {
  try {
    // Get user details from the database
    const userId = req.user.id;
    const user = await User.findById(userId).select("name");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error!\nSomething went wrong!");
  }
});

// DELETE USER ROUTE: Delete a user using POST "/api/users/deleteuser"
router.post("/deleteuser", fetchUser, async (req, res) => {
  try {
    // Get user details from the database
    const userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    res.json({
      success: true,
      msg: "User has been deleted successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error!\nSomething went wrong!");
  }
});

module.exports = router;
