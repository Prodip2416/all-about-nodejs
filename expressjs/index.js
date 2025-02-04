const express = require("express");
const { Worker } = require("worker_threads");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.get("/multi-threading", async (req, res) => {
  const worker = new Worker('./worker');

  worker.on('message', (result) => {
    res.status(200).send(`Total Count: ${result}`);
  });

  worker.on('error', (err) => {
    res.status(500).send("Error calculating total count.");
  });

});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
