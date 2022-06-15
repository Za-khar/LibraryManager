const config = require("../utils/config");

const db = require("knex")({
  client: "pg",
  connection: {
    host: config.get("DB_HOST"),
    port: config.get("DB_PORT"),
    user: config.get("DB_USER"),
    password: config.get("DB_PASSWORD"),
    database: config.get("DB_NAME"),
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = db;
