const Book = require("../models/booksModel.json");
const fs = require("fs");
const path = require("path");
const BookFilePath = path.join(__dirname, "../models/booksModel.json");

const BookFS = require(BookFilePath);

// @desc all books
// @route Get/api/books
// @access private

const getAllBooks = (req, res) => {
  const { author, publication_year } = req.query;
  let result;
  if (author || publication_year) {
    result = Book.filter((item) => {
      if (author) return item.author.toLowerCase() === author.toLowerCase();
      else return item.publication_year === publication_year;
    });
  } else {
    result = Book;
  }
  res.json({ data: result });
};

// @desc get book
// @route Get/api/books/:id
// @access private
const getBook = (req, res) => {
  const book = Book.find((item) => {
    return item.book_id === req.params.id;
  });

  if (!book) res.json({ message: "Book not found!!" });
  res.status(200).json(book);
};

// @desc new book entry
// @route POST/api/books
// @access private
const createBook = (req, res) => {
  const { title, author, publication_year } = req.body;
  if (!title || !author || !publication_year) {
    res.status(400).json({ message: "All fields are mandatory!" });
  }

  if (title.length > 20) {
    return res
      .status(400)
      .json({ message: "Title can be of 20 characters max." });
  }
  if (!/^[a-zA-Z ]+$/.test(author)) {
    return res
      .status(400)
      .json({ message: "Author can only contain alphabets and spaces." });
  }
  if (author.length > 15) {
    return res
      .status(400)
      .json({ message: "Author can be of 15 characters max." });
  }
  if (!/^\d{4}$/.test(publication_year)) {
    return res
      .status(400)
      .json({ message: "Publication year must be in year format (eg: 2024)" });
  }

  BookFS.push({
    title,
    author,
    publication_year,
    book_id: Math.floor(Math.random() * 100),
  });
  fs.writeFile(BookFilePath, JSON.stringify(BookFS, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create book!" });
    }
    res.status(201).json({ data: BookFS });
  });
};

// @desc update book
// @route Patch/api/books/:id
// @access private
const updateBook = (req, res) => {
  const bookId = req.params.id;
  const { title, author, publication_year } = req.body;

  const book = Book.find((book) => {
    return book.book_id === bookId;
  });

  if (!book) {
    return res.status(404).json({ message: "Book not found!" });
  }

  if (title) {
    book.title = title;
  }
  if (author) {
    book.author = author;
  }
  if (publication_year) {
    book.publication_year = publication_year;
  }

  fs.writeFile(BookFilePath, JSON.stringify(BookFS, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to update book!" });
    }
    res.status(200).json({ data: BookFS });
  });
};

// @desc delete book
const deleteBook = (req, res) => {
  const bookId = req.params.id;
  const book = Book.find((item) => {
    return item.book_id === bookId;
  });
  BookFS.pop(book);
  fs.writeFile(BookFilePath, JSON.stringify(BookFS, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to delete book!" });
    }
    res.json({ data: BookFS });
  });
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
