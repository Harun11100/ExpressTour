
const fs = require('fs');

// Dynamically load tours data from JSON
 const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`), 'utf-8');


 //middleware to check id 

 exports.checkId=(req,res,next,val)=>{
  
  if (req.params.val*1>tours.length){
    
     return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next()

 }
  exports.checkBody=(req,res,next)=>{
    const data=req.body
 if(!req.body.name || !req.body.price){
   return res.status(400).json({
     status:'fail',
     message: 'Name or price is missing',
   })
 }else{
  
  return res.status(200).json({
    data:{
      data
    }
  })
 }

 next()

} 

 
 

exports.getAllTours = (req, res) => {


  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
  

  const id = req.params.id * 1;

  const tour = tours.find(el => el.id === id);  

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
exports.createTour = (req, res) => {
 


  const newId = tours[tours.length - 1].id +   1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`),
    JSON.stringify(tours),
    err => {

        res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  
};
exports.updateTour = (req, res) => {
 
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  const updatedTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = updatedTour;

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`),
  JSON.stringify(tours),
    err => {
        res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    }
  
};

exports.deleteTour = (req, res) => {
  
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === id);

 

  tours.splice(tourIndex, 1);

  fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`),
  JSON.stringify(tours),
    err => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to delete the tour'
        });
      }
      res.status(204).json({
        status: 'success',
        data: null
      });
    }
  
};
