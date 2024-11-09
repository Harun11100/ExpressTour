const express=require('express')
const fs=require('fs');
const morg = require('morgan')
const { dirname } = require('path');
const app= express();


app.use(morg('dev'))


app.use(express.json())// this is a middleware to send body data to request object



app.use((req,res,next)=>{ // third argument is the convention to be a middle ware which should be next and call inside the block
console.log('hello i am from middle ware')
next();
});


app.use((req,res,next)=>{
      req.requestedTime= new Date().toISOString();
      next()
})


// read the file fro the directory and stored in "tours" as a json format
const tours=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


// this is to  read the data from the server using GET request




const getAllTours= (req,res) => {
   
            console.log(req.requestedTime)

            res.status(200).json({
                  status:'success',
                  requestTime:req.requestedTime,
                  result: tours.length,
                  data:{
                        tours
                  }
        
            })
      }
      

// this is the process to define params to the https method and how to get specific data from the server through request 
const getTour=(req,res)=>{
  
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
            
      
            
      }


 
 
// This is the way to create new data to the server 


const createTour=(req,res)=>{
    

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
       }
       
       


// This is the process to update an specific value of an object .

 const updateTour=(req,res)=>{
     
      
            if(!req.params.id*1 > tours.length){
                  return res.status(404).json({
                        status:'fail',
                        message:'Invalid Id'
                  })
            }
            res.status(200).json({
                  status:'success',
                  data:{
                        tour:'***Updated Tour***'
                  }
            })
      } 
      



// this is to delete an object from the server

const deleteTour=(req,res)=>{
     
      const id=req.params.id*1
       if(id>tours.length){

            const filteredItem=tours.filter((item)=>item.id===id)
       
           return res.status(204).json({
            status:"Deleted",
            data:{
               tour:filteredItem
            }
           })
      }
      }


// app.get('/api/v1/tours',getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours',createTour)
// app.patch('/api/v1/tours/:id',updateTour)
// app.delete('/api/v1/tours/:id',deleteTour)

app
.route('/api/v1/tours')  
.get(getAllTours)
.post(createTour)

app.route('/api/v1/tours/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)


// this is to run the server at port 8000 on localhost 127.0.0.1
const port =8000 
app.listen(port,()=>{
      console.log(`App running on this port :${port}`)
})