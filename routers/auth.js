const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('../db/conn')
const Users = require('../models/userSchema')

// router.get('/', async (req,res) => {
//     res.send('Hello from Router')
// });

//To post data
router.post('/register', async (req,res) => {
   const {name,phone,email,work,password,cpassword} = req.body
   if(!name || !phone || !email || !work || !password || !cpassword){
      return res.status(422).json({error:'plz fill all the fields'})
   }
   try{
    const userExist = await Users.findOne({email:email})
    if(userExist){
       return res.status(500).json({error:'Email is exist'})
    }else if(password != cpassword){
        return res.status(450).json({error:'password is not matching'})
    }else {
        const user = new Users({name,email,phone,work,password,cpassword})
        await user.save()
        res.status(201).json({message:'email registered successfully'})
    }
    }catch(err){
       console.log(err)
   }
})
//To Get Data
router.get('/register', async (req,res) => {
    try {
        const getData = await Users.find({})
        res.status(200).send(getData)
    } catch (error) {
        res.status(400).send(error)
    }
})
//Signin route
router.post('/signin',  async (req,res) => {
    try {
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({message:'plz fill all data'})
        }
        const userLogin = await Users.findOne({email:email})
        // console.log(userLogin)
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password)
            const token = await userLogin.generateAuthToken()
            console.log(token)
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly:true
            })
            if(!isMatch){
                res.status(400).json({error:'Invalid credencials'})
            }else{
                res.json({message:'user signin succesfully'})
            }
        }else{
            res.status(400).json({error:'Invalid credencials'})
        }
      
       
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;