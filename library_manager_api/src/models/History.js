const db = require("../services/db.service");
const TABLES = require("../consts/tables");

class HistoryModel {
  async getHistory(limit, offset) {
    return db(TABLES.controlHistory)
      .distinct()
      .select(
        `${TABLES.controlHistory}.student_copy_id as id`,
        `${TABLES.controlHistory}.return_date as returnDate`,
        `${TABLES.controlHistory}.loaned_date as loanedDate`,
        `${TABLES.controlHistory}.due_date as dueDate`,
        `${TABLES.book}.name as bookName`,
        `${TABLES.student}.name as studentName`
      )
      .leftJoin(
        TABLES.student,
        `${TABLES.controlHistory}.student_id`,
        "=",
        `${TABLES.student}.student_id`
      )
      .leftJoin(
        TABLES.bookCopy,
        `${TABLES.controlHistory}.copy_id`,
        "=",
        `${TABLES.bookCopy}.copy_id`
      )
      .leftJoin(
        TABLES.book,
        `${TABLES.bookCopy}.book_id`,
        "=",
        `${TABLES.book}.book_id`
      )
      .orderBy("loaned_date", "desc")
      .limit(limit)
      .offset(offset);
  }
  async getHistoryCount() {
    return db(TABLES.controlHistory).count("student_copy_id").first();
  }
}

module.exports = new HistoryModel();
