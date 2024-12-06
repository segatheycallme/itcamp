const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create a local array of user objects -- this will serve as our "database" for this example
const users = [{ id: 1, name: 'John Doe' }];

// GET: Get users
app.get('/users', (req, res) => res.json(users));

// GET by id: Get user by id => HOMEWORK


// POST: Create a new user
app.post('/users', (req, res) => {
  const user = { id: users.length + 1, name: req.body.name };
  users.push(user);
  res.status(201).json(user);
});

// DELETE: Delete the user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index !== -1) {
    users.splice(index, 1);
    res.json({ message: `User with id ${id} deleted` });
  } else {
    res.status(404).json({ error: `User with id ${id} not found` });
  }
});

// PUT /users:id - Update entire user object
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id); // Extract the id from the route parameters
  const index = users.findIndex(user => user.id === id); // Find the index of the user

  if (index !== -1) {
    // Replace the entire user object
    users[index] = { id, name: req.body.name };
    res.json(users[index]); // Return the updated user
  } else {
    res.status(404).json({ error: `User with id ${id} not found` });
  }
});


// PATCH /users/:id - Partially Update User Object => HOMEWORK

app.listen(3000, () => console.log('API running on http://localhost:3000'));

// Test the API using postman