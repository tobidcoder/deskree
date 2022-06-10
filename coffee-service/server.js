"use strict"; 
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an array to work as the database (temporary solution)
const ads = [
    {title: 'Hello world Tobiloba!'}
  ];

app.get('/coffee-service', (req, res) => {    
   res.status(200).send(ads);
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening at http://localhost:8080`);
});