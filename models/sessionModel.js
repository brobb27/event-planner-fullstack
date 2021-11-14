// import dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Session blueprint
const sessionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number,
        required: true
    },
    sponsor: {
        type: String,
        required: true
    },
    sponsorColor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Session', sessionSchema, 'Session')

