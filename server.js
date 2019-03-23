const express = require('express')
// path is native to nodejs
const path = require('path')
// mongoose
const mongoose = require('mongoose')
// note - assigning db sample-store which does not exist; mongo will create it on first connect
// Use when committing to github - 
mongoose.connect('mongUUUUUPPPPPPDDDDDDDre?retryWrites=true', { useNewUrlParser: true }, (err, data) => {
    if (err) {
        console.log('db fail')
        return
    }
    console.log('db success')
})

// routes
const home = require('./routes/home')
const register = require('./routes/register')
const login = require('./routes/login')

const app = express()

// path allows easy set so that 'views' dir can be accessed directly in code
app.set('views', path.join(__dirname, 'views'))
// hogan html templating engine
app.set('view engine', 'hjs')

// parse data entered into forms
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// project will automatically look here for public assets
app.use(express.static(path.join(__dirname, 'public')))

// *** paths ***
// server will always *use* home router, all requests pass through
app.use('/', home)
// form is sending data the register path
app.use('/register', register)
app.use('/login', login)

app.listen(5000)
console.log('app running on 5000')