const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    title:{
        type: String,
        required:true
    },

    description:{
        type: String
    },

    deadline:{
        type:Date,
        required:true
    }
}) 

module.exports = mongoose.model('Task',taskSchema) 