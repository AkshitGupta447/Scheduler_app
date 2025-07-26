const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGO_URI || 'mongodb://0.0.0.0/CRUD_APP').then(()=>{
    console.log('DB connected')
})

module.exports = connection