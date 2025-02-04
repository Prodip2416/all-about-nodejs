const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(a);
  // throw new Error("Not implemented");
});

app.use((err, req, res, next) => {
  if (err?.message) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("there was an error");
  }
  next();
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
