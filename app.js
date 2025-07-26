const express = require('express')
const app = express()

const connectionDB = require('./config/db')

const userRoute = require('./routes/user.routes')

const PORT = process.env.PORT || 3000;

app.set('view engine','ejs')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

const morgan = require("morgan")
app.use(morgan('dev'))


const dotenv = require('dotenv')
dotenv.config()
console.log('MONGO_URI:', process.env.MONGO_URI)

const cookieParser = require('cookie-parser');
app.use(cookieParser());



app.get('/home',(req,res)=>{
    res.render('home')
})

app.use('/user',userRoute)

const dashboardRoute = require('./routes/dashboard.routes') 
app.use('/',dashboardRoute)

// auth middleware used to accessed a page
/*const auth = require('./middleware/auth.middleware')
app.get('/user/dashboard', auth, (req, res) => {
    res.send(`Welcome, ${req.user.username}`);
  });*/


// We have to wait for database connection before starting server (ERROR HANDLING)

app.get('/', (req, res) => {
    res.redirect('/home'); // or res.render('home') directly
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connectionDB.catch((err)=>{
    console.error('DB connection failed : ', err);
});
