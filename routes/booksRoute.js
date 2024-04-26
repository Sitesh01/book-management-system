const express = require("express");

const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/booksController");
const verifyToken = require("../middleware/authMiddleware");

// Define routes for "/books"
router.route("/").get(verifyToken, getAllBooks); // Here, verifyToken is the middleware

// // Define routes for "/books/:id"
// router.route("/:id").get(getBook).patch(updateBook).delete(deleteBook);
router
  .route("/:id")
  .get(verifyToken, getBook)
  .patch(verifyToken, updateBook)
  .delete(verifyToken, deleteBook);
router.route("/").post(verifyToken, createBook);
module.exports = router;
