const Router = require("express");
const bookController = require("../controllers/book.controller");
const bookRouter = Router();
const validator = require("../middleware/validator");

bookRouter.get("/", bookController.getBooks);
bookRouter.post(
  "/",
  validator({
    book_id: ["required", "book_id", "unique:book:book_id"],
    name: ["required", "min:1", "max:255"],
    count: ["required", "min:1"],
    author: ["required"],
    year: ["required"],
  }),
  bookController.addBook
);
bookRouter.put(
  "/",
  validator({
    book_id: ["required", "book_id"],
    name: ["required", "min:1", "max:255"],
    author: ["required"],
    year: ["required"],
  }),
  bookController.updateBook
);
bookRouter.delete("/", bookController.deleteBook);

module.exports = bookRouter;
