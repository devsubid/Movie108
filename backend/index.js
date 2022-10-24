const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rating", require("./routes/rating"));
app.use("/api/review", require("./routes/reviews"));

app.get("/", (req, res) => {
  res.send("Hello! This express server is working!");
});

app.listen(port, () => {
  console.log(`Movie108 backend listening at http://localhost:${port}`);
});
