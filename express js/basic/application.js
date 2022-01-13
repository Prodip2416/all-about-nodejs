const express = require("express");

const app = express();
const admin = express();

// app.use("/admin", admin);

// app.get("/", (req, res) => {
//   res.send("hello from app");
// });

// admin.get("/dashboard", (req, res) => {
//     console.log(admin.mountpath)
//   res.send("Welcome to admin dashboard.");
// });

// app route,,,,,,,,,,,

app.route('/index/home/about')
.get((req,res)=>{
    console.log('hello from get')
})
.post((req,res)=>{
    console.log('hello from put')
})
.put((req,res)=>{
    console.log('hello from put')
})
.delete((req,res)=>{
    console.log('hello from delete')
})

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
