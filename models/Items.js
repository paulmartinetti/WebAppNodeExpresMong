const mongoose = require('mongoose')

const Item = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    interested: { type: Array, default: [] }, // array of id nums of users interested in item
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Item', Item)