// handle all routing to the home page
const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {

    //console.log(req.body)

    // the render method tells the app to use hjs, null = data obj for now
    //res.render('home', null)
    res.json({
        confirmation: 'this is from the login router',
        data: req.body
    })
})

// not running the server from here, want to export this file into the server.js
module.exports = router