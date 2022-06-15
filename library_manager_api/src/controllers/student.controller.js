const studentModel = require("../models/Student");

class StudentController {
  async getBooks(req, res) {
    try {
      const limit = req?.query?.limit || 10;
      const offset = !!req?.query?.page ? (req.query.page - 1) * limit : 0;
      const students = await studentModel.getAllStudents(limit, offset);
      res.send(students);
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Get students error!" });
    }
  }
}

module.exports = new StudentController();
