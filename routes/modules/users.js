// Set Express, Passport, user model and router
const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// Show the login page
router.get('/login', (req, res) => {
  res.render('login')
})

// Login
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/users/login')
  })
})

// Show the register page
router.get('/register', (req, res) => {
  res.render('register')
})

// Register
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // 檢查使用者是否已經註冊
  User.findOne({ email })
    .then((user) => {
      // 如果已經註冊：退回原本畫面
      if (user) {
        console.log('使用者已存在。User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        // 如果還沒註冊：寫入資料庫
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
})

// Export routes
module.exports = router
