const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.MONGO_URI ).then(()=>{
    console.log('DB connected')
})

module.exports = connection