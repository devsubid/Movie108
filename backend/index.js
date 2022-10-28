const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config();

connectToMongo();
const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rating", require("./routes/rating"));
app.use("/api/review", require("./routes/reviews"));

app.get("/", (req, res) => {
  res.send({
    message: "Express.js server is working!",
    request: req.body,
  });
});

app.listen(port, () => {
  console.log(`Express.js: Listening at http://localhost:${port}`);
});
