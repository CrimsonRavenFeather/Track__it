const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const dataSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    } , 
    date: {
        type: Date,
        required: true,
    },
    data: {
        type: Object
    }
})

const userData = mongoose.model("User", userSchema)
const userWorkoutData = mongoose.model("workoutData", dataSchema)

module.exports = { userData, userWorkoutData }