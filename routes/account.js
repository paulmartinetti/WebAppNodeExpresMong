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

        // mongoose w filter interested
        // even tho interested=Array, can pass param like this
        Item.find({ interested: user._id }, (err, interestedItemsA) => {
            if (err) return next(err)

            const data = {
                user: user,
                itemsA: itemsA,
                interestedItemsA: interestedItemsA
            }
            // hjs connection
            res.render('account', data)
        })


    })
})

// router, endpoint - add item route with id
router.get('/additem/:itemid', (req, res, next) => {

    // required user is logged in, 
    // I'm assuming express-session always passes user obj in req
    const user = req.user
    // reload home / login / register 
    if (user == null) {
        res.redirect('/')
        return
    }

    // find item
    Item.findById(req.params.itemid, (err, item) => {
        if (err) return next(err)

        // if item not already interested (array obj of Item), add user to interested
        // -1 is returned on false
        if (item.interested.indexOf(user._id) == -1) {
            item.interested.push(user._id)
            item.save()

            res.redirect('/account')
            /* res.json({
                item:item
            }) */
        }
    })

})

router.get('/removeitem/:itemid', (req, res, next) => {

    const user = req.user
    // reload home / login / register 
    if (user == null) {
        res.redirect('/')
        return
    }

    // find item, search interested array for user
    // find item
    Item.findById(req.params.itemid, (err, item) => {
        if (err) return next(err)

        // remove user
        item.interested.splice(item.interested.indexOf(user._id), 1)
        item.save()
        // refresh page
        res.redirect('/account')
    })
})

router.get('/logout', (req, res, next) => {
    // passport method
    req.logout()
    res.redirect('/')
})
// not running the server from here, want to export this file into the server.js
module.exports = router