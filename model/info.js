const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const journeySchema = new mongoose.Schema({
    departure: Date,
    return: Date,
    departure_stationID: Number,
    departure_stationName: String,
    return_stationID: Number,
    return_stationName: String,
    distance: {
        type: Number,
        min: 10
    },
    duration: {
        type: Number,
        min: 10
    }
})


module.exports = mongoose.model('Journey', journeySchema,'journeys')