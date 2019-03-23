// handle all routing to the home page
const express = require('express')
const router = express.Router()
const passport = require('passport')

router.post('/', passport.authenticate('localRegister', {
    successRedirect: '/account'
}))

// not running the server from here, want to export this file into the server.js
module.exports = router