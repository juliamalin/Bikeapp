const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');

require('dotenv').config()

app.use(cors())
app.use(express.json())

const journeyModel = require('./model/info')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('build'))


app.get('/api/journeys', (req, res) => {
    const page = parseInt(3) || 1; // Get the requested page from the query parameters, defaulting to page 1 if not provided
    const limit = 40; // Number of documents to display per page
  
    journeyModel.countDocuments({}) // Get the total count of documents
      .then((totalDocuments) => {
        const totalPages = Math.ceil(totalDocuments / limit); // Calculate the total number of pages based on the total count and the limit
  
        journeyModel.find({})
          .skip((page - 1) * limit)
          .limit(limit)
          .then((items) => {
            const uniqueDepartureStations = [...new Set(items.map((journey) => journey["Departure station name"]))];
            const uniqueReturnStations = [...new Set(items.map((journey) => journey["Return station name"]))];
            res.json({ items, totalPages, currentPage: page, uniqueDepartureStations, uniqueReturnStations });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching journeys' });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while counting documents' });
      });
  });

  app.get('/api/stations', (req, res) => {
    const results = [];
    fs.createReadStream('../Bikeapp/uploads/asemat.csv')
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        res.json(results);
      });
  });

  //hakee jokaiselle asemalla sieltä lähtien matkojen lukumäärän ja keskipituuden, top5 paluuasemat
  app.get('/api/journeys/count', (req, res) => {
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
        const countsLength = counts.length;
        res.json({ counts, countsLength });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while counting journeys' });
      });
  });

    //hakee jokaiselle asemalla sinne saapuvien matkojen lukumäärän ja keskipituuden, top5 lähtöasemat
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
        const countsLength = counts.length;
        res.json({ counts, countsLength });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while counting journeys' });
      });
  });
  



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
