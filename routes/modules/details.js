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

// Export router
module.exports = router
