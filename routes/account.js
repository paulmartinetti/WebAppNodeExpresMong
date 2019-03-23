// handle all routing to the home page
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    // the render method tells the app to use hjs, null = data obj for now
    //res.render('home', null)
    res.json({
        // passport binds the user info to the user obj
        user: req.user || 'not logged in'
    })
})

router.get('/logout',(req, res, next)=>{
    // passport method
    req.logout()
    res.json({
        confirmation: 'User logged out'
    })
})
// not running the server from here, want to export this file into the server.js
module.exports = router