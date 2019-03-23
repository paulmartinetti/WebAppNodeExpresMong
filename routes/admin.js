// handle all routing to the home page
const express = require('express')
const router = express.Router()
//const Items = require('../models/Items')

router.get('/', (req, res, next) => {
    // verify user as admin to secure admin processes
    const user = req.user

    // if it's not a user
    if (user == null) {
        res.redirect('/')
        return
    }

    // if user is not admin
    if (!user.isAdmin) {
        res.redirect('/')
        return
    }

    // if user is admin, send data
    const data = {
        user: user
    }

    // the render method tells the app to use hjs, null = data obj for now
    res.render('admin', data)

})

// not running the server from here, want to export this file into the server.js
module.exports = router