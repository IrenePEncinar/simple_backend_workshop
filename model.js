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
    responseHandler(rows)
  })
}

const createBook = (values, responseHandler) => {
  const { title, author } = values
  db.run('INSERT INTO books (title, author) VALUES (?, ?);', [title, author], (err) => {
    if (err) {
      return console.log(err.message)
    }
    responseHandler()
  })
}

const updateBook = (id, values, responseHandler) => {
  const { title, author } = values
  db.run('UPDATE books SET title = ?, author = ? WHERE id = ?;', [title, author, id], (err) => {
    if (err) {
      return console.log(err.message)
    }
    responseHandler()
  })
}

const deleteBook = (id, responseHandler) => {
  db.run('DELETE FROM books WHERE id = ?;', [id], (err) => {
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

module.exports = { getAllBooks, createBook, updateBook, deleteBook }