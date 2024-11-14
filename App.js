const express = require('express');

const morgan = require('morgan');
const app = express();

const tourRouter=require('./routes/tourRoutes')
// const userRouter=require('./routes/userRoutes')


//middleware

app.use(morgan('dev'));

app.use(express.json());

// middleware for static file sharing

app.use(express.static(`${__dirname}/public`))



  
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});
//param middleware





app.use('/app/v1/tours', tourRouter);
// app.use('/app/v1/users', userRouter);

module.exports=app;