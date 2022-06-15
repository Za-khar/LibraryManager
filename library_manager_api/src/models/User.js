const db = require("../services/db.service");
const TABLES = require("../consts/tables");

class User {
  static async findByLogin(email) {
    return db(TABLES.user)
      .select(`${TABLES.user}.*`)
      .where("email", "=", email)
      .first();
  }

  static async saveUser({ email, firstName, lastName, hashPassword }) {
    const date = new Date();

    return db(TABLES.user)
      .insert({
        email: email,
        password: hashPassword,
        first_name: firstName,
        last_name: lastName,
        created_at: date,
      })
      .returning("*");
  }

  static async updateUserData({ firstName, lastName, email }, user_id) {
    return db(TABLES.user)
      .update({
        first_name: firstName,
        last_name: lastName,
        email: email,
      })
      .where("user_id", user_id)
      .returning("*");
  }

  static async getUserById(user_id) {
    return db(TABLES.user)
      .select(`${TABLES.user}.*`)
      .where(`${TABLES.user}.user_id`, user_id)
      .first();
  }

  // static async getAvatar(user_id) {
  //   return db(User.avatarTableName)
  //     .select("path")
  //     .where("user_id", user_id)
  //     .first();
  // }
}

module.exports = User;
