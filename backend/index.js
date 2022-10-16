const express = require("express");
const connectToMongo = require("./db");

const app = express();
const port = 3000;

// routes
app.use("/api/users", require("./routes/users"));
app.use("/api/movies", require("./routes/movies"));

app.get("/", (req, res) => {
  res.send("Hello! This express server is working!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

connectToMongo();
