const { nanoid } = require('nanoid');
const data = require('./data');

const createBooksHandlers = (req, h) => {
  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const dataBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished: readPage === pageCount,
    reading,
    insertedAt,
    updatedAt,
  };

  data.push(dataBook);
  const isSuccess = data.filter((item) => item.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const readAllBooksHandler = (req, h) => {
  const { reading, finished, name } = req.query;
  let books = data;

  if (reading !== undefined) {
    switch (reading) {
      case '0':
        books = data.filter((book) => book.reading === false);
        break;
      case '1':
        books = data.filter((book) => book.reading === true);
        break;
      default:
        break;
    }
  }

  if (finished !== undefined) {
    switch (finished) {
      case '0':
        books = data.filter((book) => book.finished === false);
        break;
      case '1':
        books = data.filter((book) => book.finished === true);
        break;
      default:
        break;
    }
  }

  if (name !== undefined) {
    books = data.filter((book) => {
      const item = book.name.toLowerCase();
      const keyword = name.toLowerCase();
      return item.includes(keyword);
    });
  }

  return {
    status: 'success',
    data: {
      books,
    },
  };
};

const readBookByIdHandler = (req, h) => {
  const { bookId } = req.params;
  const book = data.filter((item) => item.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const updateBookByIdHandler = (req, h) => {
  const { bookId } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = data.findIndex((item) => item.id === bookId);
  if (index !== -1) {
    data[index] = {
      ...data[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (req, h) => {
  const { bookId } = req.params;
  const index = data.findIndex((item) => item.id === bookId);
  if (index !== -1) {
    data.splice(index, 1);
    return {
      status: 'success',
      message: 'Buku berhasil dihapus',
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  createBooksHandlers,
  readAllBooksHandler,
  readBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
