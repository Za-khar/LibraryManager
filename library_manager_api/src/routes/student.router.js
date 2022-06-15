const Router = require("express");
const studentController = require("../controllers/student.controller");
const studentRouter = Router();

studentRouter.get("/", studentController.getBooks);

module.exports = studentRouter;
