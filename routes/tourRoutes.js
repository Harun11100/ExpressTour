const express = require('express');
const tourController=require('./../Controlers/tourController')

const router = express.Router();

// param middleware
// router.param('id',(req,res,next,val)=>{
//   console.log(`tour id is ${val}`);
//   next();
// })

// checkId middleware
router.param('id',tourController.checkId)


//  create a checkbody middleware 
// check name and price property
// if not send 400 code for invalid request

   




router
  .route('/')
  .get(tourController.getAllTours)
  .post( tourController.checkBody,tourController.createTour);
 
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;