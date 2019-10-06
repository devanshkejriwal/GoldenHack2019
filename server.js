const express = require('express')
const mongoose = require('mongoose')

// Database setup
mongoose.connect('mongodb://localhost:27017/goldenhacks', {useNewUrlParser: true});
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database is connected")
});

// Schema
const categorySchema = mongoose.Schema({
  id: Number,
  title: String,
}, { collection: 'categories'})

// Application setup
const port = 3000
const app = express()
app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})


// API's
app.get('/', (req,res) => {
  res.send("Hello World");
})

app.get('/category', (req,res) => {
  // Getting name from url. Use format /search?name=tobi+ferret to get "tobi ferret"
  var companyName = req.query.name;

  //Sample query
  var Category = mongoose.model('Category',companySchema)
  Category.create({title:'Sports', id: 1})
})
