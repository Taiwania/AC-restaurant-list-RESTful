// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// Home
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
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
    .then((restaurant) => res.render('index', { restaurants: restaurant }))
    .catch((error) => console.log(error))
})

// Show the new restaurant submit form
router.get('/new', (req, res) => {
  return res.render('submit')
})

// Add new restaurant
router.post('/restaurant', (req, res) => {
  const {
    name,
    name_en,
    category,
    location,
    google_map,
    image,
    phone,
    rating,
    description
  } = req.body

  return Restaurant.create({
    name,
    name_en,
    category,
    location,
    google_map,
    image,
    phone,
    rating,
    description
  })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Export router
module.exports = router
