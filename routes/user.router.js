import Router from "express";
import UserController from "../controllers/user.controller.js";

const router = new Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAll);
router.get("/users/:id", UserController.getOne);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
