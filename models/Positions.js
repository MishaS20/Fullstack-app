const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    title: {
        type: String,
        reqired: true
    },
    category: {
        ref: 'categorys',
        type: Schema.Types.ObjectId
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})


module.exports = mongoose.model('positions', positionSchema)
