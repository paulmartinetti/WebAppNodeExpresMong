// handle all routing to the home page
const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', (req, res, next) => {

    //console.log(req.body)

    // 1. search database for the email
    const email = req.body.email
    // mongo returns an array if it's one or more users
    User.find({email: email}, (err, usersA)=>{
        if (err){
            res.json({
                confirmation: 'login email search error',
                error: err
            })
            return
        }

        // find() always returns an array, and if empty...
        if (usersA.length==0){
            res.json({
                confirmation: 'failure',
                error: 'User not found'
            })
            return
        }

        // return the first / only user
        const user = usersA[0]

        // check pw
        if (user.password != req.body.password){
            res.json({
                confirmation: 'failure',
                error: 'Password incorrect'
            })
            return
        }

        res.json({
            confirmation: 'success',
            user: user
        })
    })

    // the render method tells the app to use hjs, null = data obj for now
    //res.render('home', null)
    /* res.json({
        confirmation: 'this is from the login router',
        data: req.body
    }) */
})

// not running the server from here, want to export this file into the server.js
module.exports = router