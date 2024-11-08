const express=require('express')
const fs=require('fs');
const { dirname } = require('path');
const app= express();
app.use(express.json())// this is a middleware to send body data to request object


const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


app.get('/api/v1/tours',(req,res)=>{

      res.status(200).json({
            status:'success',
            result: tours.length,
            data:{
                  tours
            }
  
      })
})
 


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

const port =8000 
app.listen(port,()=>{
      console.log(`App running on this port :${port}`)
})