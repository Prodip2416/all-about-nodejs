const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/dashboard", function (req, res) {
  res.send("admin dashboard");
});
adminRouter.get("/about", function (req, res) {
  res.send("admin about");
});


module.exports = adminRouter;