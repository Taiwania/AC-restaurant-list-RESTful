// Set Express and router
const express = require('express')
const router = express.Router()

// Import routes
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const users = require('./modules/users')

// Set routes
router.use('/', home)
router.use('/restaurant', restaurant)
router.use('/search', search)
router.use('/users', users)

// Export routes
module.exports = router
