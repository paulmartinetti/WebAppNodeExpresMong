// handle all routing to the home page
const express = require('express')
const router = express.Router()
const itemsA = [
    { name: 'Item 1', description: '', price: 10 },
    { name: 'Item 2', description: '', price: 20 },
    { name: 'Item 3', description: '', price: 15 },
    { name: 'Item 4', description: '', price: 50 },
    { name: 'Item 5', description: '', price: 15 },
    { name: 'Item 6', description: '', price: 35 }
]

router.get('/', (req, res, next) => {
    const user = req.user

    if (user == null) {
        res.redirect('/')
        return
    }

    const data = {
        user: user,
        items: itemsA
    }

    // hjs connection
    res.render('account', data)
    // the render method tells the app to use hjs, null = data obj for now
    //res.render('home', null)

    /* res.json({
        // passport binds the user info to the user obj
        user: req.user || 'not logged in'
    }) */
})

router.get('/logout', (req, res, next) => {
    // passport method
    req.logout()
    res.redirect('/')
})
// not running the server from here, want to export this file into the server.js
module.exports = router