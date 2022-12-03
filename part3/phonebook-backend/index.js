require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

const app = express();

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing',
    });
  }

  const isExist = persons.find((person) => person.name === body.name);
  if (isExist) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }
  const person = {
    ...body,
    id: generateId(),
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get('/info', (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
  );
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT} port`);
});
