// set mongoose, express and port
const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose");

// set handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// import bootstrap and popper
app.use(express.static('public'))

// dotenv
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Connect the mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("MongoDB is not connected.");
});

db.once("open", () => {
  console.log("MongoDB is connected!");
});

// import restaurant lists
const Restaurant = require('./models/restaurant')

// index
app.get ('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants =>
      res.render("index", { restaurants })
    )
    .catch(error => console.log(error));
})

// details
app.get ('/restaurant/:id', (req, res) => {
  const RestaurantId = req.params.id
  return Restaurant.findById(RestaurantId)
    .lean()
    .then((restaurant) => res.render("details", { restaurant: restaurant }))
    .catch(error => console.log(error));
})

// search
app.get ('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }

  const keyword = req.query.keyword.trim().toLocaleLowerCase()
  const filter = {
    $or: [
      { name: new RegExp(keyword, 'i') },
      { category: new RegExp(keyword, 'i') }
    ]
  };
  return Restaurant.find(filter)
    .lean()
    .then((restaurant) => res.render("index", { restaurants: restaurant, keyword: keyword }))
    .catch(error => console.log(error));
})

// online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`)
})