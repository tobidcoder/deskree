"use strict"; 
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const createError = require('http-errors');
const path = require('path');
const {requestLimit} = require('./api-gateway/rateLimiter')
const indexRouter = require('./api-gateway/AuthController');
const port = process.env.PORT || 8080;
// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());
 
app.use(express.json());
  
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//10 requests per minute - rate limiting
app.use(requestLimit);


// app.get('/', (req, res) => {    
//    res.status(200).send("Hello world Tobiloba ddd!");
// });

// app.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     next()
//   })

app.use('/api', indexRouter);

// custom 404
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})
  
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});