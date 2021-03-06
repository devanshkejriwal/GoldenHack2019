const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require("body-parser");
const path = require("path")
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Database setup
mongoose.connect('mongodb://localhost:27017/goldenhack', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database is connected")
});

// Schema
const categorySchema = mongoose.Schema({
  id: Number,
  title: String,
  subcategory: [String]
}, { collection: 'categories'})

// Application setup
const port = 3000
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})

//Set view engine to ejs
app.set("view engine", "ejs");

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views");

//Use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/views"));

// API's
/*
app.get('/', (req,res) => {
  res.send("Hello World");
})
*/
app.get('/', (req,res) => {
  //Sample query
  var Category = mongoose.model('Category',categorySchema)
  var sports = ['Squash', 'Badminton', 'Pool', 'Swimming', 'Basketball', 'MMA']
  var movies = ['In Cinemas']
  var adventure = ['Rock Climbing', 'Axe Throwing', 'Ice Skating', 'Trampoline Park']
  var shopping = ['Shopping']
  var events = ['Concerts', 'Theatre', 'Parties']

  var insertCategories = [
    {title:'Sports', id: 1, subcategory: sports},
    {title:'Movies', id: 2, subcategory: movies},
    {title:'Adventure', id: 3, subcategory: adventure},
    {title:'Shopping', id: 4, subcategory: shopping},
    {title:'Events', id: 5, subcategory: events}

  ]

  insertCategories.forEach(function(category) {
    Category.findOneAndUpdate(category,category, {upsert: true}, function(err, doc) {
    })
  })
  res.render("index", {sports_ejs: sports})
})

app.post('/', function(req,res) {
  var inputvalue = req.body.time
  console.log("I was called")
//  window.open('localhost:8080/chat?username=Devansh', '_blank');
//  window.open('', '_blank');
  res.redirect('http://localhost:8080/chat?username=Devansh')
})
