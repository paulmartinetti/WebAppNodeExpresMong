const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = (passport) => {

    // telling passport how to store the user inside the session
    passport.serializeUser((user, next) => {
        next(null, user)
    })

    // when we want to find a currently logged-in user, we use findById
    passport.deserializeUser((id, next) => {
        // we don't have to store the user inside the session,
        // passport will find it using this:
        User.findById(id, (err, user) => {
            next(err, user)
        })
    })

    // 1. set up strategy - local login (obj, fn)
    const localLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        // this is the callback fn to passReqToCallback
    }, (req, email, password, next) => {
        // inside this block is our strategy (we coded this originally in login.js)
        // mongo returns an array if it's one or more users
        User.findOne({ email: email }, (err, user) => {

            // next() goes back to server.js next route which is error
            if (err) return next(err)

            // if no user found by findOne()
            if (user == null) return next(new Error('User not found'))

            // check pw
            if (!bcrypt.compareSync(password, user.password)) return next(new Error('Password incorrect'))

            // success
            return next(null, user)
        })
    })
    passport.use('localLogin', localLogin)

    // 2. set up strategy - local login (obj, fn)
    const localRegister = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, next) => {
        // check to see if user exists
        User.findOne({ email: email }, (err, user) => {

            // if user exists, not registering, send error user already exists
            if (err) return next(err)

            // if no user found by findOne()
            if (user != null) return next(new Error('User already exists. Please login'))

            // create new user (register) and callback (err, user) vv
            // first hash the password, higher number harder to crack
            const hashedPw = bcrypt.hashSync(password, 10)
            // now ready to create
            User.create({email: email, password: hashedPw}, (err, user)=>{
                if (err) return next(err)
                // 
                next(null, user)
            })

        })
    })
    passport.use('localRegister', localRegister)
}