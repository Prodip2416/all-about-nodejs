const express = require("express");

const publicRouter = express.Router();

const logger = (req, res, next) => {
  console.log("I am logging something.");
  next();
};

publicRouter.all("*", logger);

publicRouter.get("/", function (req, res) {
  res.send("Welcome");
});

publicRouter.get("/about", function (req, res) {
  res.send("about");
});

module.exports = publicRouter;
