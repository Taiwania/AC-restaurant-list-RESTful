// Define Express and port
const express = require('express')
const app = express()
const port = 3000

// Define related patches
const methodOverride = require('method-override')
const session = require('express-session')

// Import the configs
require('./config/mongoose')
const usePassport = require('./config/passport')

// Define the router
const router = require('./routes')

// Define and import Handlebars engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Import related patches and configs
app.use(methodOverride('_method'))
app.use(session({
  secret: 'ACRestaurant',
  resave: false,
  saveUninitialized: true
}))
usePassport(app)

// Define user authentication middleware
app.use((req, res, next) => {
  console.log(req.user)
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})

// Import Bootstrap and Popper and routers
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// Import router
app.use(router)

// Online listener
app.listen(port, () => {
  console.log(`The website http://localhost:${port} is online.`)
})
