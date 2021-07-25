// HELPER SCRIṔT TO TEST DATABASE
// Import modules
const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

// Error init cases
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length > 5) {
  console.log('Too much arguments. The possible arguments are: node mongo.js <password> <name> <number>')
  process.exit(1)
}

// Setup connection
const password = process.argv[2]

const url = `mongodb+srv://azucarnegra:${password}@cluster0.3ljtc.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('error connecting to mongodb ' + err))

// Define schema
const personSchema = new Schema({
  name: String,
  number: String
})

const Person = model('Person', personSchema)

// Succesful init cases
if (process.argv.length === 5 || process.argv.length === 4) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4] || ''
  })
  person.save().then(result => {
    console.log('person saved!')
    console.log(result)
    mongoose.connection.close()
  }
  ).catch(err => {
    console.error(err)
  }
  )
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  }).catch(err => console.log(err))
}
