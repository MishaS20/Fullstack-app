const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bidSchema = new Schema({
    list: [{
        name: {
            type: String,
        },
        summ: {
            type: Number,
        },
        coefficient: {
            type: Number,
        },
        result: {
            type: String,
        },
        win: {
            type: Number
        }
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