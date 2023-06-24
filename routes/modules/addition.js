// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// show the new restaurant submit form
router.get('/new', (req, res) => {
  return res.render('submit')
})

// add new restaurant
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
