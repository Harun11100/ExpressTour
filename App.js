const express=require('express')
const fs=require('fs');
const morg = require('morgan')
const app= express();


app.use(morg('dev'))


app.use(express.json())// this is a middleware to send body data to request object


app.use((req,res,next)=>{
      req.requestedTime= new Date().toISOString();
      next()
})

const toursRoute=express.Router()
const userRoute=express.Router()

app.use('/app/v1/tours',toursRoute)
app.use('/app/v1/users',userRoute)




// read the file fro the directory and stored in "tours" as a json format
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

// this is to  read the data from the server using GET request

const users=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`))



// this is to run the server at port 8000 on localhost 127.0.0.1

module.exports=app;