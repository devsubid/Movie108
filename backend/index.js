const express = require("express");
const connectToMongo = require("./db");

connectToMongo();
const app = express();
const port = 5000;

app.use(express.json());

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));

app.get("/", (req, res) => {
  res.send("Hello! This express server is working!");
});

app.listen(port, () => {
  console.log(`Movie108 backend listening at http://localhost:${port}`);
});

