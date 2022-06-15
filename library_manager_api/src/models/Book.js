const db = require("../services/db.service");
const TABLES = require("../consts/tables");

class BookModel {
  async getAllBooks(limit, offset) {
    return db
      .select(`${TABLES.book}.*`)
      .count("copy_id")
      .from(TABLES.book)
      .leftJoin(
        TABLES.bookCopy,
        `${TABLES.book}.book_id`,
        "=",
        `${TABLES.bookCopy}.book_id`
      )
      .groupBy(`${TABLES.book}.book_id`)
      .orderBy(`${TABLES.book}.book_id`)
      .limit(limit)
      .offset(offset);
  }

  async getBooksCount() {
    return db(TABLES.book).count("book_id").first();
  }

  async deleteBookByID(id) {
    return db(TABLES.book).where("book_id", id).del();
  }

  async addBook({ book_id, name, author = null, year = null }) {
    return db(TABLES.book)
      .insert({
        book_id,
        name,
        author,
        year,
      })
      .returning("*");
  }

  async getMaxCopyId(book_id) {
    if (!book_id) return db(TABLES.bookCopy).max("copy_id").first();
    else
      return db(TABLES.bookCopy)
        .max("copy_id")
        .where("book_id", book_id)
        .first();
  }

  async addBookCopy({ book_id, copy_id }) {
    return db(TABLES.bookCopy)
      .insert({
        copy_id,
        book_id,
        department_id: 1,
      })
      .returning("*");
  }

  async updateBookByID({ id, name, author, year }) {
    return db(TABLES.book)
      .where("book_id", id)
      .update({
        name,
        author,
        year,
      })
      .returning("*");
  }
}

module.exports = new BookModel();
