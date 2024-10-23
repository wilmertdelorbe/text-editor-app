const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;

// Serve static files from the client's dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve favicon.ico from the client directory
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/favicon.ico'));
});

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Import and use HTML routes
require('./routes/htmlRoutes')(app);

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});