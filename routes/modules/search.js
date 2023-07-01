// Set Express and router
const express = require('express')
const router = express.Router()

// Import restaurant model
const Restaurant = require('../../models/restaurant')

// search
router.get('/', (req, res) => {
  if (!req.query.keyword) {
    res.redirect('/')
  } else {
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

    const keyword = req.query.keyword.trim().toLocaleLowerCase()
    const filter = {
      $or: [
        { name: new RegExp(keyword, 'i') },
        { category: new RegExp(keyword, 'i') }
      ]
    }
    const userId = req.user._id

    return Restaurant.find({ userId, filter })
      .lean()
      .sort(sortOption)
      .then((restaurant) =>
        res.render('index', { restaurants: restaurant, keyword: keyword })
      )
      .catch((error) => console.log(error))
  }
})

// Export router
module.exports = router
