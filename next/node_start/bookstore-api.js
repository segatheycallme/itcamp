const express = require('express');
const app = express();

app.use(express.json());

const books = [{ id: 1, author: 'Dervis i smrt', title: "Mesa Selimovic" }];

app.get('/books', (_, res) => res.json(books));

app.get('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));

  if (index !== -1) {
    res.json(books[index]);
  } else {
    res.status(404).json({ error: `book with id ${parseInt(req.params.id)} not found` });
  }
})

app.post('/books', (req, res) => {
  const book = { id: books.length + 1, title: req.body.title, author: req.body.author };
  books.push(book);
  res.status(201).json(book);
});

app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));

  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: `book with id ${parseInt(req.params.id)} deleted` });
  } else {
    res.status(404).json({ error: `book with id ${parseInt(req.params.id)} not found` });
  }
});

app.put('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));

  if (index !== -1) {
    books[index] = { id: parseInt(req.params.id), title: req.body.title, author: req.body.author };
    res.json(books[index]);
  } else {
    res.status(404).json({ error: `book with id ${parseInt(req.params.id)} not found` });
  }
});


app.patch('/books/:id', (req, res) => {
  const index = books.findIndex(book => book.id === parseInt(req.params.id));

  if (index !== -1) {
    if (req.body.title !== undefined) {
      books[index].title = req.body.title;
    }
    if (req.body.author !== undefined) {
      books[index].author = req.body.author;
    }
    res.json(books[index]);
  } else {
    res.status(404).json({ error: `book with id ${parseInt(req.params.id)} not found` });
  }
});

app.listen(3000, () => console.log('started'));
