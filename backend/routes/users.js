const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();

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
      let user = await User.findOne({
        name: req.body.name,
        email: req.body.email,
      });
      if (user) {
        return res.status(400).json({ error: "User already exists" });
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      })
        .then((user) => res.json(user))
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
