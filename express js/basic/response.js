const express = require("express");

const app = express();

app.set('view engine','ejs');

// app.get("/about", (req, res) => {
//     res.render('pages/about',{
//         name: 'Apsis'
//     });
// });

app.get("/about", (req, res) => {
  //  res.json({
  //    name:"Bangladesh"
  //  })

  // res.status(201);
  // res.end();

  // res.cookie('name','Apsis Solutions Ltd.');

  // res.sendStatus(400);

  // res.redirect('/test');

  res.redirect('http://google.com')
});

app.get('/test',(req,res)=>{
    res.send('Hello from test API')
})

app.listen(3000, () => {
  console.log("App is running on port 3000.");
});
