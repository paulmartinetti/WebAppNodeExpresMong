// handle all routing to the home page
const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

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

    // user legit, load all items
    Item.find(null,(err, itemsA)=>{

        if (err) return next(err)

        const data = {
            user: user,
            itemsA: itemsA,
            fred: 'fred'
        }
        // the render method tells the app to use hjs, null = data obj for now
        res.render('admin', data)
    })
})

router.post('/additem',(req, res, next)=> {
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

    // create a new item and reload page
    Item.create(req.body, (err, item)=>{
        if (err) return next(err)
        res.redirect('/admin')
    })
})

// not running the server from here, want to export this file into the server.js
module.exports = router