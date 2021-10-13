const dotenv = require('dotenv')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

dotenv.config({path:'./config.env'})

require('./db/conn')
//to link our files with routers
app.use(express.json())
app.use(require('./routers/auth'))
// const Users = require('./models/userSchema')
const PORT= process.env.PORT

//Middleware
const middleware = (req,res,next) =>{
    console.log('Hello Middleware')
 next();
    }
app.get('/', async (req,res) => {
res.send('Hello from Home')
})
app.get('/about', middleware, async (req,res) => {
    res.send('Hello from about')
    })
    app.get('/contact', async (req,res) => {
        res.send('Hello from contact')
        })
        app.get('/signin', async (req,res) => {
            res.send('Hello from signin')
            })
            app.get('/signup', async (req,res) => {
                res.send('Hello from signup')
                })

app.listen(port,() => {
    console.log(`Hello from port side ${port}`)
})