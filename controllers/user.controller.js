import db from "../db.js";
import userServise from "../services/user.servise.js";
class UserController {
  async create(req, res) {
    try {
      const user = await userServise.create(req.body);
      res.json(user.rows);
    } catch (error) {
      res
        .status(500)
        .json(`${error}; Не получилось создать нового пользователя`);
    }
  }

  async getAll(req, res) {
    try {
      const users = await userServise.getAll();
      res.json(users.rows);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOne(req, res) {
    try {
      const users = await userServise.getOne(req.params.id);
      if (users.rowCount === 0) res.json(`Такой пользователь не существует!`);
      res.json(users.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const user = await userServise.update(req.params.id, req.body);
      if (user.rowCount === 0) res.json(`Такой пользователь не существует!`);
      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await userServise.delete(req.params.id);
      res.json(`Пользователь с id=${req.params.id} успешно удалён!`);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new UserController();
