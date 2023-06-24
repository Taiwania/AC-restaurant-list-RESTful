// Set Express and router
const express = require('express')
const router = express.Router()

// import routes
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

// set routes
router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/search', search)

// Export routes
module.exports = router
