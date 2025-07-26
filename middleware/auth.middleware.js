const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

async function auth(req,res,next){

    const token = req.cookies.token

    if(!token){
        return res.status(401).json({message : 'Unauthorized'})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        // fetch all details
        const user = await User.findById(decoded.userId);

        req.user = user

        return next()
    }
    catch(err){
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

module.exports = auth