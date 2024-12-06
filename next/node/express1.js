// Before running this code ensured you are installed Express.js correctly
// You can install express running npm install express
// This will add Express to their node_modules and update the package.json file

// Import express library
const express = require('express');

// Creates an Express application instance.
const app = express();

// Defines a route for the HTTP GET method.
// The first argument is the route path ('/' in this case).
// he second argument is a callback function that takes the request and response objects.
// res.send(): Sends a response to the client.
app.get('/', (req, res) => res.send('Welcome to Express!'));

// Starts the server and listens for requests on the specified port.
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


// Challenge:
// Add a new route /about that returns "About Express."
// Test on your own browser by visiting http://localhost:3000/about
