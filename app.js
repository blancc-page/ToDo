// After installing express through the terminal, require it in the app.js and delcare the express method as app
const express = require("express");
const app = express();

const bodyParser = require ("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

const date = require(__dirname + "/date.js")

//Tell express to serve up the public folder
app.use(express.static("public"));

// Set the app's view engine to ejs
app.set("view engine", "ejs");

const items = ["Buy Food", "Cook Food","Eat Food"];
const workItems = [];

// Set up an app.get to send data to the browser
app.get("/", function (req, res) {
  const day = date.getDate();

  res.render("list", { listTitle: day, newListItems: items});
}); 

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems:  workItems});
});

app.get("/about", function (req,res) {
  res.render("about");
});

app.post("/", function (req,res) {
    console.log(req.body);
    const item = req.body.newItem;

    if(req.body.list === "Work"){
      workItems.push(item);
      res.redirect("/work");
    } else{
      items.push(item);
      res.redirect("/");
    }


});

app.post("/work", function (req,res) {
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})
//Set up an app.listen to allow the browser to listen for port 3000
app.listen(3000, function () {
  console.log("Server started at port: 3000!");
});
