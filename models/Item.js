const mongoose = require('mongoose')
// **mongoose automatically creates a collection called items when it receives this model

// model or schema
const Item = new mongoose.Schema({
    name: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    interested: { type: Array, default: [] }, // array of id nums of users interested in item
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Item', Item)