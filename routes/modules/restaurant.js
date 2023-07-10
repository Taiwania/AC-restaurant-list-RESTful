// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')
const user = require('../../models/user')

// Show the detail page
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('details', { restaurant: restaurant }))
    .catch((error) => console.log(error))
})

// Show the edit page
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

// Edit the details
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
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

  return Restaurant.findOneAndUpdate({
    _id,
    userId,
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
    .then(() => res.redirect(`/restaurant/${_id}`))
    .catch((error) => console.log(error))
})

// Delete a restaurant
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOneAndDelete({ _id, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Export router
module.exports = router
