import express from "express";
import postsController from "../controllers/post.controller.js";
import postValidator from "../middleware/post.validator.js";

const postsRouter = express.Router();

postsRouter.post("/",
    postValidator.userExistsValidator,
    postsController.postNewPost
);

postsRouter.get("/", postsController.getAllPosts);

postsRouter.get("/:id",
    postValidator.properParameters,
    postsController.getPostByid
);

postsRouter.delete("/:id",
    postValidator.properParameters,
    postsController.deletePostById
);

postsRouter.patch("/:id",
    postValidator.properParameters,
    postValidator.useridChangeValidator,
    postsController.patchPostById
);

postsRouter.put("/:id",
    postValidator.properParameters,
    postValidator.useridChangeValidator,
    postsController.putPostById
);

export default postsRouter;