const express = require('express')
const { getAllBooks } = require('./model')

// Create express app and make it listen on port 3000
const app = express()

app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!')
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/api/books', (req, res) => {
  getAllBooks((books) => res.send(books))
})