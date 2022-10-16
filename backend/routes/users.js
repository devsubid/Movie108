const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new user using POST "/api/users"
router.post(
  "/signup",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 8 characters").isLength({
      min: 8,
    }),
    body("confirmPassword", "Passwords do not match").custom(
      (value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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
          //   jwt.sign(data,);
          res.json(user);
        })
        .catch((err) =>
          res.status(500).json({
            success: false,
            error: "Internal Server Error",
            msg: err.message,
          })
        );
    } catch {
      console.error(err.message);
      res.status(500).send("Internal Server Error!\nSomething went wrong!");
    }
  }
);

module.exports = router;
