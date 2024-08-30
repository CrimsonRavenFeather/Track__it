const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT
const url = process.env.MONGO_URL 

app.use(express.json())
app.use(cors())

const {checkToken} = require('.//middleware/check')

// CONNNECTION TO DATABASE
mongoose.connect(url)
.then(()=>{
    console.log("[CONNECTED TO THE MONGO DATABASE]")
})
.catch((err)=>{
    console.log(`${err}`)
})

// BASE

app.get('/',(req,res)=>{ 
    res.json({msg : "Hello world"})
})

// SIGNIN

const {signin} = require('./routes/signin')

app.post('/signin',signin)

// LOGIN 

const {login} = require('./routes/login')
app.post('/login',login)

// SAVE DATA 

const {save} = require('./routes/saveData')
app.post('/save',checkToken,save)

// GET DATA

const {getData} = require('./routes/getData')
app.post('/get',checkToken,getData)

// PORT LISTENING

app.listen(PORT,()=>{
    console.log(`[${PORT} IS LISTENING]`)
})



