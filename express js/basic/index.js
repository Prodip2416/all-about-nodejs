const { text } = require("express");
const express = require("express");
const handle = require('./handle');

const app = express();
// app.use(express.json());
// app.use(express.raw());
// app.use(express.text());
app.use(express.static(`${__dirname}/public/`,{
    index:' '
}));

app.locals.title = "Learning express Js";

app.get("/", handle);

app.post("/", (req, res) => {
//   console.log(req.body);
  console.log(req.body.toString());
  res.send("Hello from express post api");
});

app.listen(3000);
