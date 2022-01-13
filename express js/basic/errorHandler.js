const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send(a);
});

// URL not found.......
app.use((req, res, next) => {
  res.status(404).send("Requested URL was not found!");
});

// anything error handle from this method for hole application
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was an error!.");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("There was an error!");
    }
  }
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
