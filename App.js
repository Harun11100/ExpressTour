const express=require('express')
const fs=require('fs');
const { dirname } = require('path');
const app= express();
app.use(express.json())// this is a middleware to send body data to request object


// read the file fro the directory and stored in "tours" as a json format
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// this is to  read the data from the server using GET request

app.get('/api/v1/tours',(req,res)=>{

      res.status(200).json({
            status:'success',
            result: tours.length,
            data:{
                  tours
            }
  
      })
})


// this is the process to define params to the https method and how to get specific data from the server through request 

app.get('/api/v1/tours/:id',(req,res)=>{
      console.log(req.params)

      const id=req.params.id*1
      const tour=tours.find((el)=>
            el.id===id

      )
      
      if (id>tours.length){
            res.status(404).json({
                  status:'We coudnot find data'
            })
      }else{

            res.status(200).json({
                  status:'success',
                  data:{
                        tour
                  }
        
            })
      }
      

      
})
 
 
// This is the way to create new data to the server 

app.post('/api/v1/tours',(req,res)=>{

     const newId=tours[tours.length-1].id+1
     const newTour= Object.assign({
      id:newId},
      req.body
     )


     tours.push (newTour)

     fs.writeFile(`${dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{

            res.status(201).json({  //201 code for "Created" 200 for "OK"
                  status:'success',

                  data:{
                        tour:newTour
                  }
            })
     })
})


// this is to run the server at port 8000 on localhost 127.0.0.1
const port =8000 
app.listen(port,()=>{
      console.log(`App running on this port :${port}`)
})