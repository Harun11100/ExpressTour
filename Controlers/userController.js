const fs = require('fs');

// Dynamically load tours data from JSON
 const users=JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`), 'utf-8')

 
    exports.getAllUsers = (req, res) => {
      res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!'
      });
    };
    exports.getUser = (req, res) => {
      res.status(500).json({
        status: 'error',
        message: 'The user is not defined!'
      });
    };
    exports.createUser = (req, res) => {
      res.status(500).json({
        status: 'error',
        message: 'The user cannot be created!'
      });
    };
 