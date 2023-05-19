const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');
var csv = require('csvtojson');

require('dotenv').config()

var upload = multer({ dest: 'uploads/' });

const journeyModel = require('./model/info')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('build'))


app.get('/api/journeys', (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameters, defaulting to page 1 if not provided
    const limit = 20; // Number of documents to display per page
  
    journeyModel.countDocuments({}) // Get the total count of documents
      .then((totalDocuments) => {
        const totalPages = Math.ceil(totalDocuments / limit); // Calculate the total number of pages based on the total count and the limit
  
        journeyModel.find({})
          .skip((page - 1) * limit)
          .limit(limit)
          .then((items) => {
            res.json({ items, totalPages, currentPage: page });
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


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
