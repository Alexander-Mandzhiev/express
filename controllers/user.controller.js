import { hash } from "argon2";
import db from "../db.js";

class UserController {
  async createUser(req, res) {
    const { first_name, last_name, age, email, password } = req.body;
    const passwordHash = await hash(password);
    const newUser = await db.query(
      `INSERT INTO users (first_name, last_name, age, email, password) VALUES ($1,$2,$3,$4,$5) RETURNING id, first_name, last_name, age, email`,
      [first_name, last_name, age, email, passwordHash]
    );
    res.json(newUser.rows[0]);
  }
  async getAll(req, res) {
    const users = await db.query(`SELECT * FROM users ORDER BY id DESC`);
    res.json(users.rows);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const user = await db.query(`SELECT * FROM users WHERE id=$1`, [id]);
    res.json(user.rows);
  }
  async updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, age, email, password } = req.body;
    const passwordHash = await hash(password);
    const updateUser = await db.query(
      `UPDATE users SET first_name=$1, last_name=$2, age=$3, email=$4, password=$5 WHERE id=$6 RETURNING id, first_name, last_name, age, email`,
      [first_name, last_name, age, email, passwordHash, id]
    );
    res.json(updateUser.rows[0]);
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await db.query(`DELETE FROM users WHERE id=$1`, [id]);
    res.json(`Пользователь с id=${id} успешно удалён!`);
  }
}

export default new UserController();
