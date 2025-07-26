const express = require('express')
const router = express.Router()

const {body,validationResult} = require('express-validator')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')


router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    
    // validate fields from the req body using express validator inbuild library middleware
    body('username').trim().isLength({min:3}),
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:8}),
    
    async (req,res)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const {username,email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await userModel.create({
            email, username, password: hashedPassword
        })
        res.redirect('/home')
        //res.json(newUser)
})


router.get('/login', (req,res)=>{
    res.render('login')
})
router.post('/login',

    body('username').trim().isLength({min: 3}),
    body('password').trim().isLength({min:8}),

    async (req,res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid Data"
            })
        }

        const {username, password} = req.body;

        const user = await userModel.findOne({
            username: username
        })
        if(!user){
            return res.status(400).json({
                message: 'username or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                message: 'username or passsword is incorrect'
            })
        }

        const token = jwt.sign({
            userId: user._id,
            email: user.email,
            username: user.username
        },
    process.env.JWT_SECRET
    )

    res.cookie('token',token)
    /*res.json({
        message: 'Logged-IN',
        token: token,
        user: {
            username: user.username,
            email: user.email
        }
    })*/

    // if login successful -> redirect to dashboard route
    res.redirect('/dashboard');
    }
)

// routes/user.routes.js or similar
router.post('/logout', (req, res) => {
    res.clearCookie('token'); // remove JWT
    res.redirect('/home');        // redirect to home
  });
  

module.exports = router;