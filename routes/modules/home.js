// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')
const user = require('../../models/user')

// Home and sorting
router.get('/', (req, res) => {
  const userId = req.user._id

  // set sorting
  let sortOption = { _id: 'asc' }

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
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sortOption)
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// Show the new restaurant submit form
router.get('/new', (req, res) => {
  return res.render('submit')
})

// Add new restaurant
router.post('/restaurant', (req, res) => {
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

  return Restaurant.create({
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
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// Export router
module.exports = router
