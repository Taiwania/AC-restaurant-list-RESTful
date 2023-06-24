// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// Details route
router.get('/:id', (req, res) => {
  const RestaurantId = req.params.id
  return Restaurant.findById(RestaurantId)
    .lean()
    .then(restaurant => res.render('details', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

// Show the edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// Edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const editedRestaurant = {
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

  return Restaurant.findByIdAndUpdate(id, editedRestaurant)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

// Delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Export router
module.exports = router
