const express = require("express");

const app = express();

const adminRouter = express.Router();
app.use("/admin", adminRouter);

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
      req.originalUrl
    } - ${req.protocol} - ${req.ip}`
  );

  // throw new Error("This is a error.");
  next();
};
const errorMiddleware = (err, req, res, next) => {
  console.log(err?.message);
  res.status(500).send("There was an server side error.");
};

const wrapperLogger = (options) =>
  function (req, res, next) {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} - ${req.method} - ${
          req.originalUrl
        } - ${req.protocol} - ${req.ip}`
      );

      next();
    } else {
      throw new Error("This is a error.");
    }
  };

// adminRouter.use(logger); //logger middleware
// adminRouter.use(errorMiddleware); // error middleware
adminRouter.use(wrapperLogger({ log: true })); // wrapper middleware

adminRouter.get("/dashboard", (req, res) => {
  res.send("dashboard");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
