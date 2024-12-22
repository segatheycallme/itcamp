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
  // Log request
  console.log(`Request received: ${req.method} ${req.url}`);

  // Create new url from request object
  const url = new URL(req.url, `http://${req.headers.host}`);

  // Get the name from search params
  const name = url.searchParams.get('name') || 'World'
  const message = url.searchParams.get('message') || 'Hello'


  // Eg. what happens if we change response type here?
  // Res.writeHead is used to set HTTP headers
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  // Return the name from the request
  res.end(`${message}, ${name}!`);
});

// Listen on specific PORT in our case 3000
server.listen(3000, () => console.log('Server running at http://localhost:3000'));

// Edit this code to take two parameters: name and message.
// We can pass in url such as http://localhost:3000/?name=Emin&message=Zdravo --> in this case response is Zdravo, Emin
// The code should return message such as `${welcome}, ${name}`
// Test the route locally

// Extra question: What happens if we hit this route but doesn't provide the parameter?
