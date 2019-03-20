const express = require('express')
// path is native to nodejs
const path = require('path')
const home = require('./routes/home')

const app = express()

// path allows easy set so that 'views' dir can be accessed directly in code
app.set('views', path.join(__dirname, 'views'))
// hogan html templating engine
app.set('view engine', 'hjs')

// server will always *use* home router, all requests pass through
app.use('/', home)

app.listen(5000)
console.log('app running on 5000')