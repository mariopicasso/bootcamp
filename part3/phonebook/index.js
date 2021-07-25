// Imports
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express() // init app
require('dotenv').config()
const Person = require('./models/person')

// Configure middleware
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Route handlers
app.get('/info', (request, response, next) => {
  const date = new Date()
  Person.find({})
    .then(persons => {
      response.send(
      `<p>Phonebook has info for ${persons.length} people.</p>` + date
      )
    })
    .catch(err => next(err))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(
      person => response.json(person)
    )
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(
      () => response.status(204).end()
    )
    .catch(err => next(err))
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    response.status(400).json({ error: 'content missing' })
  }
  const person = new Person({
    name: request.body.name,
    number: request.body.number
  })
  person.save()
    .then(savedPerson => response.status(201).json(savedPerson))
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('aaaaaaaaaaaadeentrrooooooooo')
  const id = request.params.id
  const person = request.body
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

// Handler for request errors
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'Incorrect ID' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// Handler for requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Init server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
