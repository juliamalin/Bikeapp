const { MongoClient } = require('mongodb')
const moment = require('moment')
require('dotenv').config()
const url = process.env.MONGODB_URI

async function validateJourneys() {
	console.log('connecting to', url)
	const client = new MongoClient(url)

	try {
		await client.connect()

		//tietokantoihin tallentaminen nyt kommentoitu koodista pois
		//const validJourneysCollection = client.db('Journey').collection('validJourneys')
		//const invalidJourneysCollection = client.db('Journey').collection('invalidJourneys')

		const batchSize = 100
		let skip = 0
		let hasMoreJourneys = true

		while (hasMoreJourneys) {
			const collection = client.db('Journey').collection('journeys')
			const journeys = await collection.find({}).skip(skip).limit(batchSize).toArray()

			if (journeys.length === 0) {
				hasMoreJourneys = false
				break
			}

			for (const journey of journeys) {
				const validationErrors = []

				const departureTime = moment(journey.Departure, 'YYYY-MM-DD HH:mm:ss', true)
				const arrivalTime = moment(journey.Return, 'YYYY-MM-DD HH:mm:ss', true)

				if (arrivalTime.isBefore(departureTime)) {
					validationErrors.push('Arrival before departure')
				}

				const departureStationId = parseInt(journey['Departure station id'])
				if (isNaN(departureStationId) || departureStationId <= 0) {
					validationErrors.push('Invalid departure station id')
				}

				const arrivalStationId = parseInt(journey['Return station id'])
				if (isNaN(arrivalStationId) || arrivalStationId <= 0) {
					validationErrors.push('Invalid arrival station id')
				}

				const durationObj = journey['Duration (sec'] && journey['Duration (sec'][')'] ? journey['Duration (sec'][')'] : journey['Duration']
				const tripDuration = parseInt(durationObj)
				if (isNaN(tripDuration) || tripDuration < 10) {
					validationErrors.push('Trip duration less than 10 seconds')
				}

				const tripDistance = parseInt(journey['Covered distance (m)'])
				if (isNaN(tripDistance) || tripDistance <= 0) {
					validationErrors.push('Invalid covered distance')
				}

				if (validationErrors.length === 0) {
					console.log(`Journey with id ${journey._id} is valid.`)
					//await validJourneysCollection.insertOne(journey);
				} else {
					console.log(`Journey with id ${journey._id} is invalid. Errors: ${validationErrors.join(', ')}`)
					/*await invalidJourneysCollection.insertOne({
            journeyId: journey._id,
            errors: validationErrors
          });*/
				}
			}

			skip += batchSize
		}

		await client.close()
	} catch (error) {
		console.error('An error occurred:', error)
	}
}

validateJourneys()

