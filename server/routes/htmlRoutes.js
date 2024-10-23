const path = require('path');

// Export a function that sets up the main route
module.exports = (app) => {
  // Define the root route
  app.get('/', (req, res) => {
    // Send the main HTML file when the root route is accessed
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

};