// Set Express and port
const express = require('express')
const app = express()
const port = 3000

// Set related patches
const methodOverride = require('method-override')
const session = require('express-session')

// Import the router
const router = require('./routes')

// Import Mongoose and MongoDB
require('./config/mongoose')

// Set and import Handlebars engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import related patches
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ACRestaurant',
  resave: false,
  saveUninitialized: true
}))

// Import Bootstrap, Popper and routers
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(router)

// Online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`)
})
