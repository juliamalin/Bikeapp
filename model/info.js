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
    "Departure station name": String,
    return_stationID: Number,
    "Return station name": String,
    distance: {
        type: Number,
        min: 10
    },
    duration: {
        type: Number,
        min: 10
    }
})

journeySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Journey', journeySchema,'journeys')