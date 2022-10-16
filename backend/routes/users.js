const express = require("express");
const router = express.Router();

let obj = {
  name: "John",
  age: 30,
};

router.get("/", (req, res) => {
  res.json(obj);
});

module.exports = router;