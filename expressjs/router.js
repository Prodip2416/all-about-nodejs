const express = require("express");

const app = express();

const publicRouter = require("./publicRouter");
const adminRouter = require("./adminRouter");

app.use("/", publicRouter);
app.use("/admin", adminRouter);

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
