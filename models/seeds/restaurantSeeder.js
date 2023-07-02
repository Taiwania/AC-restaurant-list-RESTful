// Dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Import the configs, seeds and models
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../restaurant.json').results
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

// Set the seed user
const SEED_USER = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'User2',
    email: 'user2@example.com',
    password: '12345678'
  },
]

// Generate the seeds
db.once('open', () => {
  // Hash the passwords
  Promise.all(Array.from(SEED_USER, (user, i) => bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(user.password, salt))
    .then(hash => User.create({
      name: user.name,
      email: user.email,
      password: hash
    }))
  ))
    .then(users => {
      const [user1, user2] = users;
      const promises = Array.from({ length: 6 }, (_, i) => Restaurant.create({
        ...restaurantList[i],
        userId: i < 3 ? user1._id : user2._id  // assign userId based on index
      }))
      return Promise.all(promises)
    })
    .then(() => {
      console.log('The data of restaurants and users are imported.')
      process.exit()
    })
    .then(() => {
      console.log('Database connection closed')
    })
    .catch(error => console.log(error))
})
