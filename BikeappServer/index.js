const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const cors = require('cors')
const csv = require('csv-parser')
const fs = require('fs')

require('dotenv').config()

app.use(cors())
app.use(express.json())

const journeyModel = require('./model/info')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('build'))


app.get('/api/journeys', (req, res) => {
	const limit = parseInt(req.query.limit) || 50
	let page = parseInt(req.query.page) || 1

	journeyModel.countDocuments({})
		.then((totalDocuments) => {
			const totalPages = Math.ceil(totalDocuments / limit)

			page = Math.min(page, totalPages)

			journeyModel.find({})
				.skip((page - 1) * limit)
				.limit(limit)
				.then((items) => {
					const uniqueDepartureStations = [...new Set(items.map((journey) => journey['Departure station name']))]
					const uniqueReturnStations = [...new Set(items.map((journey) => journey['Return station name']))]
					res.json({ items, totalPages, currentPage: page, uniqueDepartureStations, uniqueReturnStations })
				})
				.catch((err) => {
					console.log(err)
					res.status(500).json({ error: 'An error occurred while fetching journeys' })
				})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: 'An error occurred while counting documents' })
		})
})


app.get('/api/journeys/stations', (req, res) => {
	const limit = parseInt(req.query.limit) || 50
	let page = parseInt(req.query.page) || 1

	journeyModel.countDocuments({})
		.then((totalDocuments) => {
			const totalPages = Math.ceil(totalDocuments / limit)

			page = Math.min(page, totalPages)

			journeyModel.find({})
				.skip((page - 1) * limit)
				.limit(limit)
				.then((items) => {
					const allJourneysStations = [...new Set([
						...items.map((journey) => journey['Departure station name']),
						...items.map((journey) => journey['Return station name'])
					])]
					res.json({ allJourneysStations,totalPages, currentPage: page })
				})
				.catch((err) => {
					console.log(err)
					res.status(500).json({ error: 'An error occurred while fetching journeys' })
				})
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: 'An error occurred while counting documents' })
		})
})

app.get('/api/stations', (req, res) => {
	const results = []
	fs.createReadStream('../BikeappServer/uploads/asemat.csv')
		.pipe(csv())
		.on('data', (data) => {
			results.push(data)
		})
		.on('end', () => {
			res.json(results)
		})
})

app.get('/api/journeys/count/departurestation', (req, res) => {
	journeyModel.aggregate([
		{
			$group: {
				_id: '$Departure station name',
				count: { $sum: 1 },
				averageDistance: { $avg: '$Covered distance (m)' },
				topReturnStations: { $push: '$Return station name' }
			}
		},

		{
			$project: {
				_id: 1,
				count: 1,
				averageDistance: 1,
				topReturnStations: {
					$slice: ['$topReturnStations', 5]
				}
			}
		}
	])
		.then((counts) => {
			const countsLength = counts.length
			res.json({ counts, countsLength })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: 'An error occurred while counting journeys' })
		})
})

app.get('/api/journeys/count/returnstation', (req, res) => {
	journeyModel.aggregate([
		{
			$group: {
				_id: '$Return station name',
				count: { $sum: 1 },
				averageDistance: { $avg: '$Covered distance (m)' },
				topDepartureStations: { $push: '$Departure station name' }
			}
		},
		{
			$project: {
				_id: 1,
				count: 1,
				averageDistance: 1,
				topDepartureStations: {
					$slice: ['$topDepartureStations', 5]
				}
			}
		}
	])
		.then((counts) => {
			const countsLength = counts.length
			res.json({ counts, countsLength })
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: 'An error occurred while counting journeys' })
		})
})


app.post('/api/journeys', (req, res) => {
	const {
		departureTime,
		returnTime,
		departureStationId,
		departureStationName,
		returnStationId,
		returnStationName,
		distance,
		duration,
	} = req.body

	if(!departureStationName || !returnStationName) {
		return res.status(400).json({
			error: 'content missing'
		})
	}


	const newJourney = new journeyModel({
		Departure: departureTime,
		Return: returnTime,
		'Departure station id': departureStationId,
		'Departure station name': departureStationName,
		'Return station id': returnStationId,
		'Return station name': returnStationName,
		'Covered distance (m)': distance,
		'Duration': duration
	})

	newJourney.save()
		.then((savedJourney) => {
			res.status(201).json(savedJourney)
		})
		.catch((err) => {
			console.log(err)
			res.status(500).json({ error: 'An error occurred while saving the journey' })
		})
})


const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
