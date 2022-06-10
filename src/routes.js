const {
  createBooksHandlers,
  readAllBooksHandler,
  readBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./handlers');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBooksHandlers,
  },
  {
    method: 'GET',
    path: '/books',
    handler: readAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: readBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: () => 'Selamat datang di bookshelf-API',
  },
];

module.exports = routes;
