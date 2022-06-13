"use strict"; 
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const indexRouter = require('./controller/coffee')

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

//coffee services router 
app.use('/coffee-service', indexRouter);

//   // custom 404
app.use((req, res, next) => {
    return res.status(404).send({
      success: false,
      msg: "Route not found"
  });
})

// Handling Errors
app.use((err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
});


app.listen(process.env.PORT || 8080, () => {
    console.log(`Example app listening at http://localhost:8080`);
});