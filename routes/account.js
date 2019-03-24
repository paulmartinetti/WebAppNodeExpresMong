// handle all routing to the home page
const express = require('express')
const router = express.Router()
const Item = require('../models/Item')

router.get('/', (req, res, next) => {
    const user = req.user
    
    // reload home / login / register 
    if (user == null) {
        res.redirect('/')
        return
    }

    // user legit, load all items
    // null = we want all items
    Item.find(null, (err, itemsA) => {

        if (err) return next(err)

        const data = {
            user: user,
            itemsA: itemsA
        }
        // hjs connection
        res.render('account', data)
    })
})

router.get('/logout', (req, res, next) => {
    // passport method
    req.logout()
    res.redirect('/')
})
// not running the server from here, want to export this file into the server.js
module.exports = router