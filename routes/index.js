// Set Express and router
const express = require('express')
const router = express.Router()

// import routes
const home = require('./modules/home')

// index
router.use('/', home)

// Export routers
module.exports = router