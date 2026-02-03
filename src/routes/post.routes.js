import express from "express";
import postsController from "../controllers/post.controller.js";
import postValidator from "../middleware/post.validator.js";

const postsRouter = express.Router();

postsRouter.post("/", postValidator.userExistsValidator, postsController.postNewPost);
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:id", postsController.getPostByid);
postsRouter.delete("/:id", postsController.deletePostById);
postsRouter.patch("/:id", postValidator.useridChangeValidator, postsController.patchPostById);
postsRouter.put("/:id", postValidator.useridChangeValidator, postsController.putPostById);

export default postsRouter;