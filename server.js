const express = require('express')
// path is native to nodejs
const path = require('path')
// mongoose
const mongoose = require('mongoose')
// note - assigning db sample-store which does not exist; mongo will create it on first connect
// Use when committing to github - 
mongoose.connect('mongUUUUUPPPPPPDDDDDDDyWrites=true', { useNewUrlParser: true }, (err, data) => {
    if (err) {
        console.log('db fail')
        return
    }
    console.log('db success')
})

// passport and session stuff
const passport = require('passport')
const session = require('express-session')
// in auth, we export as a fn, thus we have the param passport
const auth = require('./config/auth')(passport)

// routes
const home = require('./routes/home')
const register = require('./routes/register')
const login = require('./routes/login')
const account = require('./routes/account')

// main app
const app = express()

// passport, login, session
app.use(session({
    // if we're hacked, reset secret and everyone is logged out
    secret: 'ajdaldkfja',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

// path allows easy set so that 'views' dir can be accessed directly in code
app.set('views', path.join(__dirname, 'views'))
// hogan html templating engine
app.set('view engine', 'hjs')

// parse data entered into forms
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// project will automatically look here for public assets
app.use(express.static(path.join(__dirname, 'public')))

// *** paths / routes / endpoints ***
// server will always *use* home router, all requests pass through
app.use('/', home)
// form is sending data the register path
app.use('/register', register)
app.use('/login', login)
app.use('/account', account)

// vv error catch-all route - last route in this list ^^
// access from login route using next(message)
app.use((err, req, res, next)=>{
    res.render('error',{message: err})
})

app.listen(5000)
console.log('app running on 5000')