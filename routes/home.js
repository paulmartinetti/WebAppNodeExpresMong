// handle all routing to the home page
const express = require('express')
const router = express.Router()

router.get('/',(req, res, next)=>{
    
    // the render method tells the app to use hjs, null = data obj for now
    res.render('home', null)
    /* res.json({
        confirmation: 'this is from the home router',
        data: 'we are on home router'
    }) */
})

// not running the server from here, want to export this file into the server.js
module.exports = router