const express=require('express')
const fs=require('fs');
const { dirname } = require('path');
const app= express();
app.use(express.json())


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




app.get('/',(req,res)=>{
      res.status(200).json({message:'Hi there i am from server',app:'expresstour'})
})



app.post('/api/v1/tours',(req,res)=>{

     console.log(req.body)
   
     const newId=tours[tours.length-1].id+1
     const newTour= Object.assign({
      id:newId},
      req.body
     )


     tours.push (newTour)

     fs.write(`${dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours,err=>{

            res.status(201).json({
                  status:'success',

                  data:{
                        tour:newTour
                  }
            })
     }))
})

const port =8000
app.listen(port,()=>{
      console.log(`App running on this port :${port}`)
})