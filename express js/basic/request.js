const express = require("express");
const cookie = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookie());

app.get("/user", (req, res) => {
//   console.log(req.originalUrl);
//   console.log(req.path);
//   console.log(req.hostname);
//   console.log(req.params);
//   console.log(req.query);
    console.log(req.cookies);
  res.send("hello world");
});
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("app is running port 3000");
});
