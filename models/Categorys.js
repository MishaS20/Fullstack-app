const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    name: {
        type: String,
        reqired: true
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
})


module.exports = mongoose.model('categorys', categorySchema)

