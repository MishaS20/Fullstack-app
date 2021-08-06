const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true,
    }
})

module.exports = mongoose.model('users', userSchema)