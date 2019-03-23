// handle all routing to the home page
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('passport')

// instead of callback fn, we want passport to handle it
router.post('/', passport.authenticate('localLogin', {
    // if user logs in, passport will redirect to this page
    successRedirect: '/account'
}))

/* router.post('/', (req, res, next) => {

    // 1. search database for the email
    const email = req.body.email
    // mongo returns an array if it's one or more users
    User.findOne({email: email}, (err, user)=>{

        // next() goes back to server.js next route which is error
        if (err) return next(err)

        // if no user found by findOne()
        if (user == null) return next(new Error('User not found'))

        // check pw
        if (user.password != req.body.password) return next(new Error('Password incorrect'))
        
        // default
        res.json({
            confirmation: 'success',
            user: user
        })
    })

    // the render method tells the app to use hjs, null = data obj for now
}) */

// not running the server from here, want to export this file into the server.js
module.exports = router