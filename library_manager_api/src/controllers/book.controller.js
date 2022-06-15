const bookModel = require("../models/Book");

class BookController {
  async getBooks(req, res) {
    try {
      const limit = req?.query?.limit || 10;
      const offset = !!req?.query?.page ? (req.query.page - 1) * limit : 0;
      const books = await bookModel.getAllBooks(limit, offset);
      const total = await bookModel.getBooksCount();
      res.send({ data: books, total: total.count });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Get books error!" });
    }
  }

  async addBook(req, res) {
    try {
      const { book_id, name, count } = req.body;
      let copyMax = (await bookModel.getMaxCopyId())?.max || 0;
      const newBook = await bookModel.addBook({
        book_id,
        name,
        year: req.body?.year,
        author: req.body?.author,
      });

      for (let i = 0; i < count; i++) {
        copyMax++;
        await bookModel.addBookCopy({ book_id, copy_id: copyMax });
      }
      res.send({ data: newBook });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Add book error!" });
    }
  }

  async updateBook(req, res) {
    try {
      const { book_id, name } = req.body;
      const books = await bookModel.updateBookByID({
        id: book_id,
        name,
        author: req.body?.author,
        year: req.body?.year,
      });

      res.send({ data: books });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Update book erro!" });
    }
  }

  async deleteBook(req, res) {
    try {
      const book_id = req?.query?.book_id;
      const result = await bookModel.deleteBookByID(book_id);
      res.send({ data: result });
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Delete book error!" });
    }
  }
}

module.exports = new BookController();
