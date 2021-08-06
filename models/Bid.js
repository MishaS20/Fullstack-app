const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bidSchema = new Schema({
    list: [{
        name: {
            type: Number,
            reqired: true
        },
        summ: {
            type: Number,
            reqired: true
        },
        coefficient: {
            type: Number,
            reqired: true
        },
    }],

    order: {
        type: Number,
        reqired: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})


module.exports = mongoose.model('bids', bidSchema)