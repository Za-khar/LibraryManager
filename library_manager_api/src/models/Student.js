const db = require("../services/db.service");
const TABLES = require("../consts/tables");

class StudentModel {
  async getAllStudents(limit, offset) {
    return db
      .select(`${TABLES.student}.*`)
      .leftJoin(
        TABLES.bookCopy,
        `${TABLES.book}.book_id`,
        "=",
        `${TABLES.bookCopy}.book_id`
      )
      .orderBy("student_id")
      .limit(limit)
      .offset(offset);
  }
}

module.exports = new StudentModel();
