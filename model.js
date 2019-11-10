const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/books.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message)
    throw err
  }
  console.log('Connected to the books database')
})

const getAllBooks = (responseHandler) => {
  db.all('SELECT * FROM books;', (err, rows) => {
    // process rows here
    if (err) {
      console.error(err.message)
      throw err
    }
    console.log(rows)
    responseHandler(rows)
  })
}

const createBook = (values, responseHandler) => {
  db.run('INSERT INTO books (title, author) VALUES (?, ?);', ['El principito', 'Antoine de Saint-Exupéry'], (err) => {
    if (err) {
      return console.log(err.message)
    }
    responseHandler()
  })
}

const books = [
  {
    id: 1,
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes'
  },
  {
    id: 2,
    title: 'Cien años de soledad',
    author: 'Gabriel García Márquez' 
  }
]

module.exports = { getAllBooks }