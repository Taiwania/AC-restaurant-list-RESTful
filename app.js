// set express and port
const express = require('express')
const app = express()
const port = 3000

// set handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// import bootstrap and popper
app.use(express.static('public'))

// import restaurant lists
const restaurantList = require('./restaurant.json')

app.get ('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
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