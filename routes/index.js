// Set Express and router
const express = require('express')
const router = express.Router()

// Define and import middleware
const { authenticator } = require('../middleware/auth')

// Import routes
const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const users = require('./modules/users')
const auth = require('./modules/auth')

// Set routes
router.use('/restaurant', authenticator, restaurant)
router.use('/search', search)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)

// Export routes
module.exports = router
