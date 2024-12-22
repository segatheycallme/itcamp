// Nodejs HTTP Server using node's http module
// Key points :
// - A server listens for incoming requests on specific port.
// - The req(request) object contains information about the request.
// - The res(response) object contains information about the response.

// Import http module from node.js
import { createServer } from 'http';

// This lines creates a new server instance
// Callback function (req,res)=>{...} runs on every request
const server = createServer((req, res) => {
  // Log what request is received on server
  console.log(`Request received: ${req.method} ${req.url}`);
  // Res here is our response object that we send back on every request in our case
  // 200 is status code - OK
  // Content-Type is format in which we return the data
  // Res.writeHead is used to set HTTP headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // This is what we send back to the client and end the request
  res.end('Hello, Node.js Web!');
});

// Listen on specific PORT in our case 3000
server.listen(3000, () => console.log('Server running at http://localhost:3000'));

//We can run this code via node server-1.js
// node {filename} enable us to run specific files via node.js on our machine
