const express = require("express");

// Initialize Express app
const app = express();

const router = express.Router();

app.use(express.json());// parse body to json
app.use(express.static(`${__dirname}/public/`)); // access static files
app.use(router);

app.param('id', (req, res, next) => {
  req.user = {
    id: req.params.id,
    name: 'User'+ req.params.id,
  }
  next();
});
app.get('/user/:id', (req, res) => {
  console.log(req.user)
  res.send('Welcome');
})

// router.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });
// router.post("/", (req, res) => {
//   console.log(req.body);
//   res.send("Hello, from post!");
// });

app.listen(3000, (req, res) => {
  console.log("Server is running on port 3000");
});
