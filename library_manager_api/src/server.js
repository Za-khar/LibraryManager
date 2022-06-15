const dotenv = require("dotenv");
const express = require("express");
const bookRouter = require("./routes/book.router");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const historyRouter = require("./routes/history.router");
const config = require("./utils/config");
const { authMiddleware } = require("./middleware//auth.middleware");
const { checkAuthorized } = require("./middleware/acl");
const studentRouter = require("./routes/student.router");
const cors = require("cors");

dotenv.config();
const app = express();
const port = config.get("PORT", 6000);

const corsOptions = {
  origin: `http://${config.get("CLIENT_HOST")}:${config.get("CLIENT_PORT")}`,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(authMiddleware);

app.use("/auth", authRouter);
app.use("/book", checkAuthorized, bookRouter);
app.use("/student", checkAuthorized, studentRouter);
app.use("/user", checkAuthorized, userRouter);
app.use("/history", checkAuthorized, historyRouter);

app.use((err, req, res, next) => {
  res.status(500).send("500 Server Error");
});

app.use((req, res) => {
  res.status(404).send("404 Not found");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
