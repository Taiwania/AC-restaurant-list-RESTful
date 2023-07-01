// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// Show the detail page
router.get('/:id', (req, res) => {
  const RestaurantId = req.params.id
  return Restaurant.findById(RestaurantId)
    .lean()
    .then((restaurant) => res.render('details', { restaurant: restaurant }))
    .catch((error) => console.log(error))
})

// Show the edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// Edit the details
router.put('/:id', (req, res) => {
  const id = req.params.id
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

  return Restaurant.findByIdAndUpdate(id, {
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
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error))
})

// Delete a restaurant
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Export router
module.exports = router
