import express from "express";
import UserController from "../controllers/user.controller.js";
import userValidator from "../middleware/user.validator.js";

const usersRouter = express.Router();

usersRouter.get("/", UserController.getAllUsers);
usersRouter.get("/:id", UserController.getUserById);
usersRouter.post("/", userValidator.allFieldsFilledValidator, userValidator.uniqueValidator, UserController.postNewUser);
usersRouter.delete("/:id", UserController.deleteUserById);
usersRouter.patch("/:id", userValidator.allFieldsEmptyValidator, UserController.patchUserById);
usersRouter.put("/:id", userValidator.allFieldsFilledValidator, userValidator.uniqueValidator, UserController.putUserById);

export default usersRouter;