const express = require("express");
const bodyParser = require("body-parser");
const { uuid } = require("uuidv4");
const port = 8000;

const USERS = [
  {
    id: "d964099a-1a2a-46f5-9782-e2601b5aac9e",
    username: "fazi",
    password: "1234",
  },
  {
    id: "a77d280e-94b8-4a1e-a869-1f14e622fa4e",
    username: "pera",
    password: "1234",
  },
  {
    id: "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    username: "mika",
    password: "1234",
  },
  {
    id: "3de3d9ff-60b1-4694-9e87-77aefea9ea0e",
    username: "zika",
    password: "1234",
  },
];

// Mapping between token and user's id
// token : userId
const TOKENS = {
  "ba13533b-e275-45a2-bc2e-b3098036d655":
    "d964099a-1a2a-46f5-9782-e2601b5aac9e",
  "csa31d3b-e275-45a2-bc2e-b3098036d655":
    "a77d280e-94b8-4a1e-a869-1f14e622fa4e",
  "popk376k-e275-45a2-bc2e-b3098036d655":
    "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
  "yuim98oq-e275-45a2-bc2e-b3098036d655":
    "3de3d9ff-60b1-4694-9e87-77aefea9ea0e",
};

const QUOTES = [
  {
    id: "4f71adf6-b7f5-45a5-82d6-1ed37d79c2d1",
    content: `Be yourself; everyone else is already taken.`,
    author: "Oscar Wilde",
    tags: ["be yourself", "honesty", "inspirational"],
    userId: "d964099a-1a2a-46f5-9782-e2601b5aac9e",
    upvotesCount: 21,
    downvotesCount: 3,
    createdAt: "2020-07-12T07:54:35.090Z",
    upvotedBy: [
      "a77d280e-94b8-4a1e-a869-1f14e622fa4e",
      "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    ],
    downvotedBy: ["3de3d9ff-60b1-4694-9e87-77aefea9ea0e"],
  },
  {
    id: "25bb3e69-5b6b-4376-8f77-f79d6bac40c9",
    content: `Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.`,
    author: "Albert Einstein",
    tags: [
      "human nature",
      "humor",
      "infinity",
      "philosophy",
      "science",
      "stupidity",
      "universe",
    ],
    userId: "d964099a-1a2a-46f5-9782-e2601b5aac9e",
    upvotesCount: 26,
    downvotesCount: 2,
    createdAt: "2020-07-12T07:55:35.090Z",
    upvotedBy: [
      "d964099a-1a2a-46f5-9782-e2601b5aac9e",
      "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
      "3de3d9ff-60b1-4694-9e87-77aefea9ea0e",
    ],
    downvotedBy: [],
  },
  {
    id: "490c0852-8cd2-4f00-a413-810584d018b4",
    content: `So many books, so little time.`,
    author: "Frank Zappa",
    tags: ["books", "humor"],
    userId: "a77d280e-94b8-4a1e-a869-1f14e622fa4e",
    upvotesCount: 1,
    downvotesCount: 4,
    createdAt: "2020-07-12T08:55:35.090Z",
    upvotedBy: [
      "d964099a-1a2a-46f5-9782-e2601b5aac9e",
      "a77d280e-94b8-4a1e-a869-1f14e622fa4e",
    ],
    downvotedBy: ["3de3d9ff-60b1-4694-9e87-77aefea9ea0e"],
  },
  {
    id: "cd877754-66cf-43bb-9301-c8bef1e61ec0",
    content: `A room without books is like a body without a soul.`,
    author: "Marcus Tullius Cicero",
    tags: ["books", "simile", "soul"],
    userId: "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    upvotesCount: 10,
    downvotesCount: 2,
    createdAt: "2020-07-12T09:55:35.090Z",
    upvotedBy: ["49d73d43-e1bc-46b4-88a6-d802d1cc9fe9"],
    downvotedBy: [],
  },
  {
    id: "147dc7ad-e752-4f7c-9d4d-1bf41153001e",
    content: `You only live once, but if you do it right, once is enough.`,
    author: "Mae West",
    tags: ["humor", "life"],
    userId: "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    upvotesCount: 88,
    downvotesCount: 123,
    createdAt: "2020-07-12T10:55:35.090Z",
    upvotedBy: [],
    downvotedBy: [
      "3de3d9ff-60b1-4694-9e87-77aefea9ea0e",
      "d964099a-1a2a-46f5-9782-e2601b5aac9e",
    ],
  },
  {
    id: "90f4b4db-380f-4f59-804d-07645ac63611",
    content: `Be the change that you wish to see in the world.`,
    author: "Mahatma Gandhi",
    tags: ["action", "action", "inspirational", "philosophy", "wish"],
    userId: "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    upvotesCount: 6,
    downvotesCount: 0,
    createdAt: "2020-07-12T11:25:35.090Z",
    upvotedBy: ["49d73d43-e1bc-46b4-88a6-d802d1cc9fe9"],
    downvotedBy: [],
  },
  {
    id: "5697623d-c4f8-4631-a797-098bcd3751b8",
    content: `In three words I can sum up everything I've learned about life: it goes on.`,
    author: "Robert Frost",
    tags: ["life"],
    userId: "49d73d43-e1bc-46b4-88a6-d802d1cc9fe9",
    upvotesCount: 6,
    downvotesCount: 5,
    createdAt: "2020-07-12T11:25:35.090Z",
    upvotedBy: ["49d73d43-e1bc-46b4-88a6-d802d1cc9fe9"],
    downvotedBy: [],
  },
];

const app = express();
app.use(bodyParser.json());
app.use(require("cors")());

function getToken(req) {
  const header = req.header("Authorization");
  if (header == null) return null;
  const prefix = "Bearer ";
  if (!header.startsWith(prefix)) return null;
  return header.slice(prefix.length);
}

function identifyUser(req) {
  //   return USERS[0]
  const token = getToken(req);
  if (token == null) return null;
  const userId = TOKENS[token];
  if (userId == null) return null;
  const user = USERS.find((user) => user.id === userId);
  if (user == null) return null;
  return user;
}

function getAllTags() {
  const tags = QUOTES.map((quote) => quote.tags).reduce((acc, curr) => [
    ...acc,
    ...curr,
  ]);
  return Array.from(new Set(tags));
}

function transformQuote(quote, userId) {
  return {
    id: quote.id,
    content: quote.content,
    author: quote.author,
    tags: quote.tags,
    userId: quote.userId,
    upvotesCount: quote.upvotesCount,
    downvotesCount: quote.downvotesCount,
    createdAt: quote.createdAt,
    givenVote: quote.upvotedBy.includes(userId)
      ? "upvote"
      : quote.downvotedBy.includes(userId)
      ? "downvote"
      : "none",
  };
}

// LOGIN

app.post("/sessions", (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find((user) => user.username === username);
  if (user == null || user.password !== password) {
    res.status(401).send(null);
    return;
  }
  const userData = Object.entries(TOKENS).find(
    ([accessToken, userId]) => userId === user.id
  );
  const [accessToken] = userData;
  res.status(200).send({ accessToken });
});

// app.delete('/sessions', (req, res) => {
//   const user = identifyUser(req)
//   if (user == null) return res.status(401).send()
//   const token = getToken(req)
//   delete TOKENS[token]
//   res.status(200).send()
// })

app.get("/tags", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();
  res.status(200).send(getAllTags());
});

app.get("/quotes", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();

  const tags = ((req.query.tags || "").split(",") || []).filter((x) => !!x);
  const page = Number.parseInt(req.query.page) || 1;
  const pageSize = Number.parseInt(req.query.pageSize) || 20;
  const sortBy = req.query.sortBy || "upvotesCount";
  const sortDirection = req.query.sortDirection || "desc";

  const quotes = QUOTES.filter((quote) => {
    return tags.length === 0 || quote.tags.some((tag) => tags.includes(tag));
  });
  quotes.sort((a, b) => {
    const dataA = a[sortBy];
    const dataB = b[sortBy];
    return sortDirection === "asc"
      ? dataA > dataB
        ? 1
        : -1
      : dataA > dataB
      ? -1
      : 1;
  });

  const start = (page - 1) * pageSize;
  const end = page * pageSize;

  res.send({
    quotesCount: quotes.length,
    quotes: quotes
      .slice(start, end)
      .map((quote) => transformQuote(quote, user.id)),
  });
});

app.get("/quotes/:id", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();

  const quote = QUOTES.find((quote) => quote.id === req.params.id);
  if (quote == null) return res.status(404).send();

  res.send(transformQuote(quote, user.id));
});

app.post("/quotes", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();

  const { content, author, tags } = req.body;
  const errors = [];

  if (!content) errors.push({ key: "content", value: "required" });
  if (content && typeof content != "string")
    errors.push({ key: "content", value: "wrongType" });
  if (!author) errors.push({ key: "author", value: "required" });
  if (author && typeof author != "string")
    errors.push({ key: "author", value: "wrongType" });
  if (!tags) errors.push({ key: "tags", value: "required" });
  if (tags && !Array.isArray(tags))
    errors.push({ key: "tags", value: "wrongType" });

  if (errors.length > 0) {
    const error = errors.reduce(
      (acc, curr) => ({ ...acc, [curr.key]: curr.value }),
      {}
    );
    return res.status(422).send(error);
  }

  const id = uuid();
  const quote = {
    id,
    content,
    author,
    tags,
    userId: user.id,
    upvotesCount: 0,
    downvotesCount: 0,
    createdAt: new Date().toISOString(),
    upvotedBy: [],
    downvotedBy: [],
  };

  QUOTES.push(quote);
  res.status(201).send(transformQuote(quote, user.id));
});

app.post("/quotes/:id/upvote", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();
  const quote = QUOTES.find((quote) => quote.id === req.params.id);
  if (quote == null) return res.status(404).send();

  if (quote.upvotedBy.includes(user.id))
    return res.status(400).send({ error: `Already upvoted.` });
  if (quote.downvotedBy.includes(user.id))
    return res
      .status(400)
      .send({ error: `Delete the existing downvote in order to upvote.` });

  quote.upvotedBy.push(user.id);
  quote.upvotesCount++;
  res.status(200).send(transformQuote(quote, user.id));
});

app.delete("/quotes/:id/upvote", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();
  const quote = QUOTES.find((quote) => quote.id === req.params.id);
  if (quote == null) return res.status(404).send();

  if (!quote.upvotedBy.includes(user.id))
    return res.status(400).send({ error: `No upvote to delete.` });

  const indexToDelete = quote.upvotedBy.indexOf(user.id);
  quote.upvotedBy.splice(indexToDelete, 1);
  quote.upvotesCount--;
  res.status(200).send(transformQuote(quote, user.id));
});

app.post("/quotes/:id/downvote", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();
  const quote = QUOTES.find((quote) => quote.id === req.params.id);
  if (quote == null) return res.status(404).send();

  if (quote.upvotedBy.includes(user.id))
    return res
      .status(400)
      .send({ error: `Delete the existing upvote in order to downvote.` });
  if (quote.downvotedBy.includes(user.id))
    return res.status(400).send({ error: `Already downvoted.` });

  quote.downvotedBy.push(user.id);
  quote.downvotesCount++;
  res.status(200).send(transformQuote(quote, user.id));
});

app.delete("/quotes/:id/downvote", (req, res) => {
  const user = identifyUser(req);
  if (user == null) return res.status(401).send();
  const quote = QUOTES.find((quote) => quote.id === req.params.id);
  if (quote == null) return res.status(404).send();

  if (!quote.downvotedBy.includes(user.id))
    return res.status(400).send({ error: `No downvote to delete.` });

  const indexToDelete = quote.downvotedBy.indexOf(user.id);
  quote.downvotedBy.splice(indexToDelete, 1);
  quote.downvotesCount--;
  res.status(200).send(transformQuote(quote, user.id));
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
