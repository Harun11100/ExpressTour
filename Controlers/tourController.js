
const fs = require('fs');

// Dynamically load tours data from JSON
 const tours =JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`), 'utf-8')



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

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};
exports.createTour = (req, res) => {
 


  const newId = tours.length > 0 ? tours[tours.length - 1].id + 1 : 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to save the new tour'
        });
      }
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
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

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      if (err) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to update the tour'
        });
      }
      res.status(200).json({
        status: 'success',
        data: {
          tour: updatedTour
        }
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === id);

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }

  tours.splice(tourIndex, 1);

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
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
  );
};
