// handle all routing to the home page
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/',(req, res, next)=>{

    data = {
        env: "fred"
    }
    
    // the render method tells the app to use hjs, null = data obj for now
    res.render('home', data)
    /* res.json({
        confirmation: 'this is from the home router',
        data: 'we are on home router'
    }) */
})
// I built to see users to see what I put for 
router.get('/users', (req, res, next) => {
    const query = req.query
    User.find(query)
        .then(users => res.json({ users: users }))
        .catch(err => err.message)
})
// not running the server from here, want to export this file into the server.js
module.exports = router