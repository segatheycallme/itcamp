const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Create a local array of book objects -- this will serve as our "database" for this example
const books = [{ id: 1, author: 'John Doe', title: "aabbcc" }];

// GET: Get books
app.get('/books', (req, res) => res.json(books));

// GET by id: Get book by id => HOMEWORK
app.get('/books/:id', (req, res) => {

  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    res.json(books[index]);
  } else {
    res.status(404).json({ error: `book with id ${id} not found` });
  }
})

// POST: Create a new book
app.post('/books', (req, res) => {
  const book = { id: books.length + 1, title: req.body.title, author: req.body.author };
  books.push(book);
  res.status(201).json(book);
});

// DELETE: Delete the book
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `book with id ${id} deleted` });
  } else {
    res.status(404).json({ error: `book with id ${id} not found` });
  }
});

// PUT /books:id - Update entire book object
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id); // Extract the id from the route parameters
  const index = books.findIndex(book => book.id === id); // Find the index of the book

  if (index !== -1) {
    // Replace the entire book object
    books[index] = { id, title: req.body.title, author: req.body.author };
    res.json(books[index]); // Return the updated book
  } else {
    res.status(404).json({ error: `book with id ${id} not found` });
  }
});


// PATCH /books/:id - Partially Update book Object => HOMEWORK
app.patch('/books/:id', (req, res) => {
  const id = parseInt(req.params.id); // Extract the id from the route parameters
  const index = books.findIndex(book => book.id === id); // Find the index of the book

  if (index !== -1) {
    if (req.body.title !== undefined) {
      books[index].title = req.body.title;
    }
    if (req.body.author !== undefined) {
      books[index].author = req.body.author;
    }
    res.json(books[index]); // Return the updated book
  } else {
    res.status(404).json({ error: `book with id ${id} not found` });
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));

// Test the API using postman
