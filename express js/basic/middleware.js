const express = require("express");

const app = express();

const moddleware = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol}
    - ${req.ip}`);
    // next();
    throw new Error('There is an error!');
};
const errorHandleMiddleware = (err, req, res, next)=>{
    console.log(err.message);
    res.status(500).send('There was a server side error!');
   
}

app.use(moddleware);
app.use(errorHandleMiddleware);

app.get("/home", (req, res) => {
  res.send("Hello from home");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});
