import express from "express";
import postsController from "../controllers/post.controller.js";
import postValidator from "../middleware/post.validator.js";

const postRouter = express.Router();

postRouter.post("/me",
    postValidator.userExistsValidator,
    postsController.postNewPost
);

postRouter.get("/", postsController.getAllPosts);

postRouter.get("/me",
    postsController.getPostsByUserId
);

postRouter.delete("/me/:id",
    postValidator.properParameters,
    postsController.deletePostById
);

postRouter.patch("/me/:id",
    postValidator.properParameters,
    postValidator.useridChangeValidator,
    postsController.patchPostById
);

postRouter.put("/me/:id",
    postValidator.useridChangeValidator,
    postsController.putPostById
);

export default postRouter;