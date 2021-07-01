const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
  {
    name: 'arto hellas',
    number: '3452345',
    id: 1
  },
  {
    name: 'ada lovelace',
    number: '14513453524',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  },
  {
    name: 'bob patiño',
    number: '1239812309',
    id: 5
  },
  {
    name: 'don nadie',
    number: '2346246526',
    id: 6
  }
]
app.use(cors())
app.use(express.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (request, response) => {
  response.status(200).send('<h1>okey</h1>')
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(
        `<p>Phonebook has info for ${persons.length} people.</p>` + date
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find((person) => person.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  persons = persons.filter((person) => person.id !== id)
  response.status(204).end()
})

const generatedId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
  console.log(maxId)
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  console.log(request.body)

  if (!request.body.name || !request.body.number) {
    response.status(400).json({ error: 'content missing' })
  } else if (persons.map(person => person.name.toLowerCase()).includes(request.body.name.toLowerCase())) {
    response.status(400).json({ error: 'name must be unique' })
  }

  const person = request.body
  person.id = generatedId()
  persons = [...persons, person]
  response.status(201).json(person)
})

const PORT = process.env.PORT || 3001
app.listen(3001, () => {
  console.log(`Server listening on port ${PORT}`)
})
