// Set Express and router
const express = require('express')
const router = express.Router()

// import routes
const home = require('./modules/home')
const details = require('./modules/details')
const addition = require('./modules/addition')

// set routes
router.use('/', home)
router.use('/restaurant', details)
router.use('/', addition)

// Export routers
module.exports = router