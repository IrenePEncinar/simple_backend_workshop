const Database = require('sqlite-async')

let db

Database.open('./db/books.db')
    .then(d => {
      console.log('Connected to the books database - async')
      db = d
    })
    .catch(err => {
      console.error(err.message)
    })

const getBook = id => {
  return db.get('SELECT * FROM books WHERE id = ?;', [id])
}

module.exports = { getBook }