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
const restaurantList = require('./restaurant.json')
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

app.get ('/restaurant/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('details', { restaurant: restaurant })
})

app.get ('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || 
    restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurant, keyword: keyword })
})

// online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`)
})