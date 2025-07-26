const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [3,'username length at least be 3']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [10,'email must be at least 10 characters long']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [5,'password must be at least 5 characters long']
    }
})

const userModel = mongoose.model('user',userSchema)
module.exports = userModel