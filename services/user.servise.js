import { hash } from "argon2";
import db from "../db.js";

class UserService {
  async create(user) {
    const { first_name, last_name, age, email, password } = user;
    const passwordHash = await hash(password);
    const newUser = await db.query(
      `INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING id, first_name, last_name, age, email`,
      [first_name, last_name, age, email, passwordHash]
    );
    return newUser;
  }

  async getAll() {
    const users = await db.query(
      `SELECT id, first_name, last_name, age, email FROM users  ORDER BY id DESC `
    );
    return users;
  }

  async getOne(id) {
    const user = await db.query(
      `SELECT id, first_name, last_name, age, email FROM users WHERE id=$1`,
      [id]
    );
    return user;
  }

  async update(id, user) {
    const existUser = await this.getOne(id);
    if (!existUser) throw new Error(`Такой пользователь не существует!`);
    const { first_name, last_name, age, email, password } = user;
    const passwordHash = await hash(password);
    const updateUser = await db.query(
      `UPDATE users SET first_name=$1, last_name=$2, age=$3, email=$4, password=$5 WHERE id=$6 RETURNING id, first_name, last_name, age, email`,
      [first_name, last_name, age, email, passwordHash, id]
    );
    return updateUser;
  }

  async delete(id) {
    return await db.query(`DELETE FROM users WHERE id=$1`, [id]);
  }
}

export default new UserService();
