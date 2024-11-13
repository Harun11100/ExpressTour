const express = require('express');

const morgan = require('morgan');
const app = express();

const tourRouter=require('./routes/tourRoutes')

app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});


app.use('/app/v1/tours', tourRouter);

module.exports=app;