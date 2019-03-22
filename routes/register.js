// handle all routing to the home page
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req, res, next) => {

    // mongoose is in User model
    User.create(req.body,(err, user)=>{
        if (err){
            res.json({
                confirmation: 'fail',
                error: err
            })
            return
        }

        res.json({
            confirmation: 'success register w User model',
            user: user
        })
    })

    // res.render('home', null)
    /* res.json({
        confirmation: 'this is from the register router',
        // req.body is the package of the form data
        data: req.body
    }) */
})

// not running the server from here, want to export this file into the server.js
module.exports = router