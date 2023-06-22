// Set Express and router
const express = require('express')
const router = express.Router()

// import routes
const home = require('./modules/home')
const details = require('./modules/details')

// set routes
router.use('/', home)
router.use('/restaurant', details)

// Export routers
module.exports = router