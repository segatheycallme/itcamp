// Route parameters allow dynamic values in the URL that can be used to customize responses.
// Example: /user/:name can handle requests like /user/John or /user/Jane.


const express = require('express');

const app = express();

// Defines a route for the HTTP GET method.
// The first argument is the route path ('/' in this case).
// The second argument is a callback function that takes the request and response objects.
// res.send(): Sends a response to the client.
// :name is the parameter we can get from the url.
app.get('/user/:name', (req, res) => {
  const name = req.params.name; // Extract the name parameter from the URL
  res.send(`Hello, ${name}!`);
});
app.get('/lecture/:code', (req, res) => {
  const code = req.params.code; // Extract the name parameter from the URL
  res.send(`You successfully submitted ${code} to our server.`);
});

// Starts the server and listens for requests on the specified port.
app.listen(3000, () => console.log('Server running on http://localhost:3000'));


// Challenge:
// Create a new route /lecture/:code that takes the code parameter
// And return message "You successfully submitted ${code} to our server."

