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
    Departure: Date,
    Return: Date,
    "Departure station id": Number,
    "Departure station name": String,
    "Return station id": Number,
    "Return station name": String,
    "Covered distance (m)": {
        type: Number,
        min: 10
    },
    "Duration": {
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