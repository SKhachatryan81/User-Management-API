import express from "express";
import * as usersController from "../controllers/users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);
usersRouter.get("/:id", usersController.getUserById);
usersRouter.post("/", usersController.postNewUser);
usersRouter.delete("/:id", usersController.deleteUserById);
usersRouter.patch("/:id", usersController.patchUserById);
usersRouter.put("/:id", usersController.putUserById);

export default usersRouter;