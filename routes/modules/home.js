// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// Home
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

// Sort the restaurants on the index page (under construction)
router.get('/', (req, res) => {
  let sortOption = {}

  switch (req.query.sort) {
    case 'AtoZ':
      sortOption = { name: 1 }
      break
    case 'ZtoA':
      sortOption = { name: -1 }
      break
    case 'Category':
      sortOption = { category: 1 }
      break
    case 'Region':
      sortOption = { location: 1 }
      break
    default:
      sortOption = { name: 1 }
      break
  }

  return Restaurant.find()
    .lean()
    .sort(sortOption)
    .then(restaurant => res.render('index', { restaurants: restaurant }))
    .catch(error => console.log(error))
})

// Show the new restaurant submit form
router.get('/new', (req, res) => {
  return res.render('submit')
})

// Add new restaurant
router.post('/restaurant', (req, res) => {
  const newRestaurant = {
    name: req.body.name,
    name_en: req.body.name_en,
    category: req.body.category,
    location: req.body.location,
    google_map: req.body.google_map,
    image: req.body.image,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description
  }

  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Export router
module.exports = router
