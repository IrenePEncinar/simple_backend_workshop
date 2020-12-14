const express = require('express')
const { getAllBooks, createBook, updateBook, deleteBook } = require('./model')
const { getBook } = require('./model_async')

// Create express app and make it listen on port 3000
const app = express()

app.listen(3000, () => {
  console.log('Server is listening on port 3000. Ready to accept requests!')
})

// EXTRA - basic auth
const basicAuth = require('express-basic-auth')
app.use(basicAuth({
  users: { 'irene': '1234' }
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/api/books', (req, res) => {
  getAllBooks((books) => res.send(books))
})

app.post('/api/books', (req, res) => {
  createBook(req.body, () => res.status(201).send())
})

app.put('/api/books/:id', (req, res) => {
  updateBook(req.params.id, req.body, () => res.send())
})

app.delete('/api/books/:id', (req, res) => {
  deleteBook(req.params.id, () => res.send())
})

// EXTRA - get single book
// With promise
app.get('/api/books/:id', (req, res) => {
  getBook(req.params.id).then(book => res.send(book))
})

// With async/await
app.get('/api/books/:id', async (req, res) =>  {
  const book = await getBook(req.params.id)
  res.send(book)
})
